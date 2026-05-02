import fs from "fs/promises";
import path from "path";
import AdmZip from "adm-zip";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LEGACY_POSTS_PATH = path.join(process.cwd(), "lib", "posts.json");
const BLOGS_DIR = path.join(process.cwd(), "data");
const BLOGS_PATH = path.join(BLOGS_DIR, "blogs.json");
const UPLOADS_DIR = path.join(process.cwd(), "public", "images", "uploads");

async function collectUploadFiles(dir, files = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await collectUploadFiles(fullPath, files);
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }
  return files;
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
    await fs.mkdir(BLOGS_DIR, { recursive: true });
    const legacy = await fs.readFile(LEGACY_POSTS_PATH, "utf8");
    await fs.writeFile(BLOGS_PATH, legacy.trimEnd() + "\n", "utf8");
  }
}

export async function POST(request) {
  const adminPass = process.env.ADMIN_PASS;
  if (!adminPass) {
    return Response.json(
      {
        error: "Server is not configured. Set ADMIN_PASS in environment variables.",
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
  const action = typeof body?.action === "string" ? body.action : "";
  const slug = typeof body?.slug === "string" ? body.slug.trim() : "";

  if (!password) {
    return Response.json({ error: "Password is required." }, { status: 400 });
  }

  if (password !== adminPass) {
    return Response.json({ error: "Invalid password." }, { status: 401 });
  }

  try {
    await ensureBlogsFileSeeded();
    const posts = await readPostsArray();

    if (action === "list") {
      const summary = posts.map((post) => ({
        slug: String(post?.slug || "").trim(),
        title: String(post?.title || "").trim(),
      }));
      return Response.json({ ok: true, posts: summary });
    }

    if (action === "download") {
      const payload = JSON.stringify(posts, null, 2) + "\n";
      return new Response(payload, {
        status: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Content-Disposition": "attachment; filename=blogs.json",
        },
      });
    }

    if (action === "download-images") {
      try {
        await fs.access(UPLOADS_DIR);
      } catch {
        return Response.json(
          { error: "No uploaded images found." },
          { status: 404 },
        );
      }

      const files = await collectUploadFiles(UPLOADS_DIR);
      if (files.length === 0) {
        return Response.json(
          { error: "No uploaded images found." },
          { status: 404 },
        );
      }

      const zip = new AdmZip();
      for (const filePath of files) {
        const relPath = path.relative(UPLOADS_DIR, filePath);
        const data = await fs.readFile(filePath);
        zip.addFile(relPath.replace(/\\/g, "/"), data);
      }

      const payload = zip.toBuffer();
      return new Response(payload, {
        status: 200,
        headers: {
          "Content-Type": "application/zip",
          "Content-Disposition": "attachment; filename=images.zip",
        },
      });
    }

    if (action === "delete") {
      if (!slug) {
        return Response.json({ error: "Slug is required." }, { status: 400 });
      }
      const nextPosts = posts.filter((post) => String(post?.slug).trim() !== slug);
      if (nextPosts.length === posts.length) {
        return Response.json({ error: "Slug not found." }, { status: 404 });
      }
      await fs.writeFile(
        BLOGS_PATH,
        JSON.stringify(nextPosts, null, 2) + "\n",
        "utf8",
      );
      return Response.json({ ok: true, removed: slug });
    }

    return Response.json({ error: "Invalid action." }, { status: 400 });
  } catch (err) {
    return Response.json(
      { error: err?.message || "Request failed." },
      { status: 500 },
    );
  }
}
