import { posts, getAuthors } from "@/lib/data";

export default async function sitemap() {
  const baseUrl = "https://clinicinfo.trailflow.in";

  // Core Pages
  const staticPages = [
    "",
    "/about-us",
    "/contact-us",
    "/privacy-policy",
    "/disclaimer",
    "/terms-and-conditions",
    "/category/clinic",
  ].map((url) => ({
    url: `${baseUrl}${url}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: url === "" ? 1 : 0.8,
  }));

  // Blog Posts
  const postEntries = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.isoDate),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Author Pages
  const authors = getAuthors();
  const authorEntries = authors.map((author) => ({
    url: `${baseUrl}/author/${author.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [...staticPages, ...postEntries, ...authorEntries];
}
