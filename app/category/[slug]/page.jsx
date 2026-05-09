import CategoryPage from "@/components/CategoryPage";
import { getAllPosts } from "@/lib/data";
import { categories } from "@/lib/categories";

export const revalidate = 60;

export async function generateStaticParams() {
  return Object.keys(categories).map((slug) => ({ slug }));
}

export default async function CategoryPageRoute({ params }) {
  const { slug } = await params;
  const all = getAllPosts();
  const normalizedSlug = String(slug).toLowerCase();
  const posts = all.filter(
    (p) => String(p.category || "").toLowerCase() === normalizedSlug,
  );

  return <CategoryPage slug={normalizedSlug} posts={posts} />;
}
