import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact Us",
  description:
    "Contact ClinicInfo for corrections, feedback, and general questions about our clinic and health guides.",
  alternates: {
    canonical: "/contact-us",
  },
  openGraph: {
    title: "Contact ClinicInfo",
    description:
      "Send feedback or questions about ClinicInfo articles, pages, or site issues.",
    url: "https://clinicinfo.trailflow.in/contact-us",
    siteName: "ClinicInfo",
    type: "website",
  },
};

export default function ContactUsPage() {
  return (
    <main className="mx-auto max-w-[900px] px-5 py-12 md:py-20">
      <div className="rounded-2xl bg-white p-8 shadow-sm md:p-12">
        <h1 className="mb-4 text-3xl font-bold text-[#001f42] md:text-4xl">
          Contact Us
        </h1>

        <div className="prose prose-slate max-w-none text-[16px] leading-relaxed text-slate-600">
          <p>
            We welcome feedback about our articles and pages. If you noticed a
            broken link, a typo, an outdated detail, or you have a suggestion
            for a clinic topic you’d like us to cover, send us a message below.
          </p>
          <p>
            If you are contacting us about a specific article, please include
            the article title or URL and a short explanation of what should be
            corrected. We typically respond within a few business days.
          </p>
          <p>
            You can also email us directly at{" "}
            <a href="mailto:support@clinicinfo.trailflow.in">
              support@clinicinfo.trailflow.in
            </a>
            .
          </p>
        </div>

        <div className="mt-8">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
