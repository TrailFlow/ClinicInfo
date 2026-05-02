import BlogArchive from "@/components/BlogArchive";
import { getPaginatedPosts, POSTS_PER_PAGE } from "@/lib/data";

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
  const { posts, totalPages, currentPage } = getPaginatedPosts(
    1,
    POSTS_PER_PAGE,
  );

  return (
    <BlogArchive
      posts={posts}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}
