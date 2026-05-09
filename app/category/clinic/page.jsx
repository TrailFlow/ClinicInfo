import CategoryPage from "@/components/CategoryPage";
import { getAllPosts } from "@/lib/data";

export const revalidate = 60;

export const metadata = {
  title: "clinic",
  description: "Clinic category archive."
};

export default function ClinicCategoryPage() {
  const posts = getAllPosts().filter((post) => post.category === "clinic");
  return <CategoryPage slug="clinic" posts={posts} />;
}
