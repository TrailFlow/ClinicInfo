import fs from "fs/promises";
import path from "path";
import AdmZip from "adm-zip";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LEGACY_POSTS_PATH = path.join(process.cwd(), "lib", "posts.json");
const BLOGS_DIR = path.join(process.cwd(), "data");
const BLOGS_PATH = path.join(BLOGS_DIR, "blogs.json");
const UPLOADS_DIR = path.join(process.cwd(), "public", "images", "uploads");

function stripHtml(html) {
  return String(html)
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#8217;|&hellip;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildExcerptFromContent(content) {
  const text = stripHtml(content);
  if (!text) return "";
  const short = text.slice(0, 180).trim();
  return short.length < text.length ? `${short}…` : short;
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function validateIncomingEntry(entry) {
  if (!isPlainObject(entry)) {
    return { ok: false, error: "Entry must be a JSON object." };
  }

  const required = ["title", "slug", "content", "image", "date"];
  for (const key of required) {
    if (!(key in entry)) {
      return { ok: false, error: `Missing required field: ${key}` };
    }
    if (typeof entry[key] !== "string" || !entry[key].trim()) {
      return { ok: false, error: `Field '${key}' must be a non-empty string.` };
    }
  }

  const slug = entry.slug.trim();
  if (slug.includes("/") || slug.includes(" ")) {
    return {
      ok: false,
      error: "Slug must not contain spaces or '/' characters.",
    };
  }

  if (stripHtml(entry.content).length < 200) {
    return {
      ok: false,
      error: "Content looks too short. Please add more detail.",
    };
  }

  if ("images" in entry) {
    if (!Array.isArray(entry.images)) {
      return { ok: false, error: "Field 'images' must be an array." };
    }
    const invalid = entry.images.some(
      (value) => typeof value !== "string" || !value.trim(),
    );
    if (invalid) {
      return {
        ok: false,
        error: "Field 'images' must contain non-empty strings.",
      };
    }
  }

  return { ok: true };
}

function normalizeImagePath(value) {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("/")) return trimmed;
  return `/images/uploads/${trimmed}`;
}

function sanitizeZipPath(entryName) {
  const normalized = path.normalize(entryName).replace(/^[\\/]+/, "");
  if (normalized.includes("..")) return "";
  return normalized;
}

async function extractZipToUploads(fileBuffer) {
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
  const zip = new AdmZip(fileBuffer);
  const entries = zip.getEntries();

  for (const entry of entries) {
    if (entry.isDirectory) continue;
    const safeName = sanitizeZipPath(entry.entryName);
    if (!safeName) continue;
    const dest = path.join(UPLOADS_DIR, safeName);
    if (!dest.startsWith(UPLOADS_DIR)) continue;
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.writeFile(dest, entry.getData());
  }
}

async function readPostsArray() {
  // Prefer data/blogs.json; fall back to legacy lib/posts.json.
  try {
    const file = await fs.readFile(BLOGS_PATH, "utf8");
    const parsed = JSON.parse(file);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    const file = await fs.readFile(LEGACY_POSTS_PATH, "utf8");
    const parsed = JSON.parse(file);
    return Array.isArray(parsed) ? parsed : [];
  }
}

async function ensureBlogsFileSeeded() {
  try {
    await fs.access(BLOGS_PATH);
    return;
  } catch {
    // Create data/blogs.json seeded from legacy posts.
    await fs.mkdir(BLOGS_DIR, { recursive: true });
    const legacy = await fs.readFile(LEGACY_POSTS_PATH, "utf8");
    await fs.writeFile(BLOGS_PATH, legacy.trimEnd() + "\n", "utf8");
  }
}

function nextId(posts) {
  const max = posts.reduce((acc, p) => {
    const id = Number(p?.id);
    return Number.isFinite(id) ? Math.max(acc, id) : acc;
  }, 0);
  return max + 1;
}

export async function POST(request) {
  const adminPass = process.env.ADMIN_PASS;
  if (!adminPass) {
    return Response.json(
      {
        error:
          "Server is not configured. Set ADMIN_PASS in environment variables.",
      },
      { status: 500 },
    );
  }

  const contentType = request.headers.get("content-type") || "";

  let password = "";
  let entries = [];
  let imageZipFile = null;

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    password = typeof formData.get("password") === "string" ? formData.get("password") : "";
    const jsonFile = formData.get("jsonFile");
    imageZipFile = formData.get("imageZip");

    if (!jsonFile || typeof jsonFile.arrayBuffer !== "function") {
      return Response.json({ error: "JSON file is required." }, { status: 400 });
    }

    try {
      const buffer = Buffer.from(await jsonFile.arrayBuffer());
      const parsed = JSON.parse(buffer.toString("utf8"));
      entries = Array.isArray(parsed) ? parsed : [parsed];
    } catch (err) {
      return Response.json(
        { error: err?.message || "Invalid JSON file." },
        { status: 400 },
      );
    }
  } else {
    let body;
    try {
      body = await request.json();
    } catch {
      return Response.json(
        { error: "Invalid JSON request body." },
        { status: 400 },
      );
    }

    password = typeof body?.password === "string" ? body.password : "";
    const entry = body?.entry;
    entries = Array.isArray(entry) ? entry : [entry];
  }

  if (!password) {
    return Response.json({ error: "Password is required." }, { status: 400 });
  }

  if (password !== adminPass) {
    return Response.json({ error: "Invalid password." }, { status: 401 });
  }

  const filteredEntries = entries.filter(Boolean);
  if (filteredEntries.length === 0) {
    return Response.json({ error: "No blog entries found." }, { status: 400 });
  }

  for (const entry of filteredEntries) {
    const valid = validateIncomingEntry(entry);
    if (!valid.ok) {
      return Response.json({ error: valid.error }, { status: 400 });
    }
  }

  try {
    await ensureBlogsFileSeeded();
    const posts = await readPostsArray();

    const existingSlugs = new Set(
      posts.map((post) => String(post?.slug).trim()),
    );

    for (const entry of filteredEntries) {
      const slug = entry.slug.trim();
      if (existingSlugs.has(slug)) {
        return Response.json({ error: `Slug already exists: ${slug}` }, { status: 409 });
      }
      existingSlugs.add(slug);
    }

    if (imageZipFile && typeof imageZipFile.arrayBuffer === "function") {
      const zipBuffer = Buffer.from(await imageZipFile.arrayBuffer());
      await extractZipToUploads(zipBuffer);
    }

    let next = nextId(posts);
    const createdSlugs = [];

    for (const entry of filteredEntries) {
      const isoDate = (() => {
        const parsed = new Date(entry.date);
        return Number.isFinite(parsed.getTime())
          ? parsed.toISOString().slice(0, 19)
          : new Date().toISOString().slice(0, 19);
      })();

      const newPost = {
        id: next,
        slug: entry.slug.trim(),
        title: entry.title.trim(),
        author: entry.author?.trim?.() || "ClinicInfo",
        authorSlug: entry.authorSlug?.trim?.() || "clinicinfo",
        category: entry.category?.trim?.() || "clinic",
        date: entry.date.trim(),
        isoDate,
        image: normalizeImagePath(entry.image),
        images: Array.isArray(entry.images)
          ? entry.images.map(normalizeImagePath)
          : undefined,
        excerpt: entry.excerpt?.trim?.() || buildExcerptFromContent(entry.content),
        content: entry.content,
      };

      posts.push(newPost);
      createdSlugs.push(newPost.slug);
      next += 1;
    }

    await fs.writeFile(BLOGS_PATH, JSON.stringify(posts, null, 2) + "\n", "utf8");

    return Response.json({
      ok: true,
      message: `Saved ${createdSlugs.length} post(s).`,
      slugs: createdSlugs,
    });
  } catch (err) {
    return Response.json(
      { error: err?.message || "Failed to save blog entry." },
      { status: 500 },
    );
  }
}
