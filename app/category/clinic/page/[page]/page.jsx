import { notFound } from "next/navigation";
import CategoryPage from "@/components/CategoryPage";
import { getAllPosts, POSTS_PER_PAGE } from "@/lib/data";

export const revalidate = 60;
export const dynamicParams = false;

export function generateStaticParams() {
  const clinicPosts = getAllPosts().filter((post) => post.category === "clinic");
  const totalPages = Math.ceil(clinicPosts.length / POSTS_PER_PAGE);

  return Array.from({ length: totalPages - 1 }, (_, index) => ({
    page: String(index + 2)
  }));
}

export async function generateMetadata({ params }) {
  const { page } = await params;

  return {
    title: `clinic - Page ${page}`,
    description: `Clinic category archive page ${page}.`
  };
}

export default async function ClinicCategoryPagedPage({ params }) {
  const { page } = await params;
  const pageNumber = Number(page);
  const clinicPosts = getAllPosts().filter((post) => post.category === "clinic");
  const totalPages = Math.ceil(clinicPosts.length / POSTS_PER_PAGE);

  if (
    !Number.isInteger(pageNumber) ||
    pageNumber < 2 ||
    pageNumber > totalPages
  ) {
    notFound();
  }

  return <CategoryPage slug="clinic" posts={clinicPosts} />;
}
