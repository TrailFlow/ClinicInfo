import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LEGACY_POSTS_PATH = path.join(process.cwd(), "lib", "posts.json");
const BLOGS_DIR = path.join(process.cwd(), "data");
const BLOGS_PATH = path.join(BLOGS_DIR, "blogs.json");

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

  return { ok: true };
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

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON request body." }, { status: 400 });
  }

  const password = typeof body?.password === "string" ? body.password : "";
  const entry = body?.entry;

  if (!password) {
    return Response.json({ error: "Password is required." }, { status: 400 });
  }

  if (password !== adminPass) {
    return Response.json({ error: "Invalid password." }, { status: 401 });
  }

  const valid = validateIncomingEntry(entry);
  if (!valid.ok) {
    return Response.json({ error: valid.error }, { status: 400 });
  }

  try {
    await ensureBlogsFileSeeded();
    const posts = await readPostsArray();

    const slug = entry.slug.trim();
    const existing = posts.find((p) => String(p?.slug).trim() === slug);
    if (existing) {
      return Response.json({ error: "Slug already exists." }, { status: 409 });
    }

    const isoDate = (() => {
      const parsed = new Date(entry.date);
      return Number.isFinite(parsed.getTime())
        ? parsed.toISOString().slice(0, 19)
        : new Date().toISOString().slice(0, 19);
    })();

    const newPost = {
      id: nextId(posts),
      slug,
      title: entry.title.trim(),
      author: entry.author?.trim?.() || "ClinicInfo",
      authorSlug: entry.authorSlug?.trim?.() || "clinicinfo",
      category: entry.category?.trim?.() || "clinic",
      date: entry.date.trim(),
      isoDate,
      image: entry.image.trim(),
      excerpt: entry.excerpt?.trim?.() || buildExcerptFromContent(entry.content),
      content: entry.content,
    };

    posts.push(newPost);

    await fs.writeFile(BLOGS_PATH, JSON.stringify(posts, null, 2) + "\n", "utf8");

    return Response.json({ ok: true, slug: newPost.slug });
  } catch (err) {
    return Response.json(
      { error: err?.message || "Failed to save blog entry." },
      { status: 500 },
    );
  }
}
