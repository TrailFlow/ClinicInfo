import { notFound } from "next/navigation";
import AuthorPageComponent from "@/components/AuthorPage";
import {
  getAuthorBySlug,
  getAuthors,
  getPaginatedAuthorPosts,
  getPostsByAuthor,
  POSTS_PER_PAGE,
} from "@/lib/data";

export const revalidate = 60;
export const dynamicParams = false;

export function generateStaticParams() {
  return getAuthors().map((author) => ({
    author: author.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { author: authorSlug } = await params;
  const author = getAuthorBySlug(authorSlug);

  if (!author) {
    return {
      title: "Author Not Found",
    };
  }

  return {
    title: `${author.name} — ClinicInfo Author`,
    description: `Read ClinicInfo posts by ${author.name}.`,
  };
}

export default async function AuthorPage({ params }) {
  const { author: authorSlug } = await params;
  const author = getAuthorBySlug(authorSlug);

  if (!author) {
    notFound();
  }

  const allPosts = getPostsByAuthor(author.slug);
  const { posts } = getPaginatedAuthorPosts(author.slug, 1, POSTS_PER_PAGE);
  return (
    <AuthorPageComponent author={author} posts={allPosts} pagePosts={posts} />
  );
}
