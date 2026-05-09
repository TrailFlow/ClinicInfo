import HomePage from "@/components/HomePage";
import { getAllPosts, getTotalPages, POSTS_PER_PAGE } from "@/lib/data";

export const revalidate = 60;

export const metadata = {
  title: "Clinic Guides, Tests & Hospital Articles",
  description:
    "ClinicInfo helps patients and caregivers understand clinics, tests, and hospital services before an appointment with clear, practical guides.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ClinicInfo — Practical clinic and hospital guides",
    description:
      "Browse patient-first articles about clinics, diagnostic tests, appointments, and healthcare services.",
    url: "https://clinicinfo.trailflow.in/",
    siteName: "ClinicInfo",
    type: "website",
  },
};

export default function Home() {
  const allPosts = getAllPosts().sort(
    (a, b) => new Date(b.isoDate) - new Date(a.isoDate),
  );
  const totalPages = getTotalPages(POSTS_PER_PAGE);
  const pagePosts = allPosts.slice(0, POSTS_PER_PAGE);

  return (
    <HomePage
      posts={allPosts}
      pagePosts={pagePosts}
      totalPages={totalPages}
      currentPage={1}
      totalCount={allPosts.length}
    />
  );
}
