import fs from "fs";
import path from "path";
import { authors } from "@/lib/authors";
import { categories } from "@/lib/categories";

export const POSTS_PER_PAGE = 10;

const LEGACY_POSTS_PATH = path.join(process.cwd(), "lib", "posts.json");
const BLOGS_PATH = path.join(process.cwd(), "data", "blogs.json");

function readJsonArray(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? parsed : [];
}

// Canonical category slugs and labels used across the site
export const CATEGORIES = [
  "medical",
  "technology",
  "finance",
  "lifestyle",
  "business",
  "clinic",
];

export const CATEGORY_LABELS = Object.fromEntries(
  Object.entries(categories).map(([slug, meta]) => [slug, meta.label]),
);

function normalizeCategory(cat) {
  if (!cat) return cat;
  const c = String(cat).toLowerCase();
  if (c === "hospital") return "medical"; // legacy -> new
  return c;
}

export function getAllPosts() {
  try {
    const arr = readJsonArray(BLOGS_PATH);
    return Array.isArray(arr)
      ? arr.map((post) => ({ ...post, category: normalizeCategory(post.category) }))
      : [];
  } catch {
    const arr = readJsonArray(LEGACY_POSTS_PATH);
    return Array.isArray(arr)
      ? arr.map((post) => ({ ...post, category: normalizeCategory(post.category) }))
      : [];
  }
}

export function getRecentPosts(limit = 5) {
  return getAllPosts()
    .slice()
    .sort((left, right) => {
      const leftTime = new Date(left.isoDate || left.date || 0).getTime();
      const rightTime = new Date(right.isoDate || right.date || 0).getTime();
      return rightTime - leftTime;
    })
    .slice(0, limit);
}

export function getTotalPages(perPage = POSTS_PER_PAGE) {
  const posts = getAllPosts();
  return Math.ceil(posts.length / perPage);
}

export function getAuthors() {
  const posts = getAllPosts();
  return Array.from(
    new Map(
      posts.map((post) => [
        post.authorSlug,
        {
          name: post.author,
          slug: post.authorSlug
        }
      ])
    ).values()
  );
}

export function getAuthorBySlug(authorSlug) {
  if (authors[authorSlug]) {
    return { slug: authorSlug, ...authors[authorSlug] };
  }

  return getAuthors().find((author) => author.slug === authorSlug);
}

export function getPostsByAuthor(authorSlug) {
  const posts = getAllPosts();
  return posts.filter((post) => post.authorSlug === authorSlug);
}

export function getPagePath(page) {
  return page === 1 ? "/" : `/page/${page}`;
}

export function getPaginatedPosts(page = 1, perPage = POSTS_PER_PAGE) {
  return paginatePosts(getAllPosts(), page, perPage);
}

export function getPaginatedAuthorPosts(
  authorSlug,
  page = 1,
  perPage = POSTS_PER_PAGE
) {
  return paginatePosts(getPostsByAuthor(authorSlug), page, perPage);
}

export function paginatePosts(postList, page = 1, perPage = POSTS_PER_PAGE) {
  const totalPages = Math.ceil(postList.length / perPage);
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * perPage;

  return {
    posts: postList.slice(start, start + perPage),
    totalPages,
    currentPage
  };
}

export function getPostBySlug(slug) {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug);
}

export function getPostNavigation(slug) {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);

  return {
    previous: index > 0 ? posts[index - 1] : null,
    next: index >= 0 && index < posts.length - 1 ? posts[index + 1] : null
  };
}

export function getRelatedPosts(currentSlug, limit = 3) {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];

  const posts = getAllPosts();
  const otherPosts = posts.filter((post) => post.slug !== currentSlug);
  const related = otherPosts.filter((post) => post.category === currentPost.category);

  if (related.length < limit) {
    const additionalPosts = otherPosts.filter((post) => post.category !== currentPost.category);
    related.push(...additionalPosts.slice(0, limit - related.length));
  }

  return related.slice(0, limit);
}
