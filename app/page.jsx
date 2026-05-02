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
    POSTS_PER_PAGE
  );

  return (
    <BlogArchive
      posts={posts}
      currentPage={currentPage}
      totalPages={totalPages}
      intro={
        <div className="rounded-2xl bg-white px-8 py-8 shadow-sm sm:px-10">
          <h2 className="text-2xl font-bold text-[#001f42]">
            What is ClinicInfo?
          </h2>
          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-slate-600">
            <p>
              ClinicInfo is a patient-first library of articles that explain
              what different clinics and hospital services do — in plain
              language. Many people book an appointment while still wondering
              what happens during the visit, how to prepare, what paperwork to
              bring, or which questions are worth asking. We try to answer those
              practical questions so you can feel prepared before you arrive.
            </p>
            <p>
              You’ll find guides covering common clinic types (like eye,
              dental, pediatric, physiotherapy, and mental health clinics),
              diagnostic services (such as blood tests and routine screenings),
              and “how to” topics like planning follow-ups or understanding the
              difference between urgent care and emergency services.
            </p>
            <p>
              This site is for readers who want reliable basics without medical
              jargon — patients, caregivers, and anyone comparing care options.
              ClinicInfo does not provide diagnosis or treatment. If you have a
              medical concern, the right next step is to talk to a qualified
              healthcare professional who can advise you based on your history.
            </p>
            <p className="font-medium text-slate-700">
              Tip: Start with the “Clinic” category to browse by topic, or open
              an article and use the headings to jump to the sections you need.
            </p>
          </div>
        </div>
      }
    />
  );
}
