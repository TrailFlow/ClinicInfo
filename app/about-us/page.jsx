export const metadata = {
  title: "About Us",
  description:
    "Learn what ClinicInfo publishes, who it is for, and how we approach health and clinic information.",
  alternates: {
    canonical: "/about-us",
  },
  openGraph: {
    title: "About ClinicInfo",
    description:
      "ClinicInfo publishes practical, patient-first guides about clinics, hospital departments, tests, and appointments.",
    url: "https://clinicinfo.trailflow.in/about-us",
    siteName: "ClinicInfo",
    type: "website",
  },
};

export default function AboutUsPage() {
  return (
    <main className="mx-auto max-w-[900px] px-5 py-12 md:py-20">
      <div className="rounded-2xl bg-white p-8 shadow-sm md:p-12">
        <h1 className="mb-8 text-3xl font-bold text-[#001f42] md:text-4xl">
          About ClinicInfo
        </h1>

        <div className="prose prose-slate max-w-none space-y-6 text-[16px] leading-relaxed text-slate-600">
          <p>
            ClinicInfo is an informational website that helps readers understand
            common clinics, hospital departments, and diagnostic services before
            they book an appointment. If you have ever searched for answers like
            “what happens at an eye clinic?”, “do I need fasting for a blood
            test?”, or “urgent care vs emergency room”, you know how confusing
            healthcare terminology can be. Our goal is to turn that confusion
            into clear next steps.
          </p>

          <h2 className="text-xl font-semibold text-[#001f42]">What we publish</h2>
          <p>
            We publish practical guides that explain: what a clinic typically
            does, who should consider visiting, what to expect during a visit,
            how to prepare, and what questions to ask your provider. We also
            cover everyday topics like preventive checkups, vaccinations,
            diagnostics, women’s and men’s health, and specialty services. The
            focus is on patient experience and decision-making, not on promoting
            a single hospital or a specific doctor.
          </p>

          <h2 className="text-xl font-semibold text-[#001f42]">Who it is for</h2>
          <p>
            ClinicInfo is written for patients, caregivers, and anyone trying to
            make sense of healthcare options. Some readers are booking an
            appointment for the first time; others are comparing services across
            clinics, or preparing for a follow-up visit. We try to keep the
            language simple, while still being accurate and respectful of how
            personal health decisions can be.
          </p>

          <h2 className="text-xl font-semibold text-[#001f42]">How we approach accuracy</h2>
          <p>
            Healthcare information changes over time and can vary by country,
            clinic, and patient situation. Our articles are designed to be a
            starting point, not a replacement for professional advice.
            Whenever you are unsure, the safest step is to speak with a licensed
            clinician who understands your medical history. If you notice
            something that looks outdated or unclear, we welcome feedback so we
            can improve it.
          </p>

          <h2 className="text-xl font-semibold text-[#001f42]">Our purpose</h2>
          <p>
            The mission of ClinicInfo is simple: help people prepare, ask better
            questions, and feel more confident when navigating clinics and
            hospital services. A well-prepared patient can communicate symptoms
            more clearly, follow instructions more reliably, and reduce
            avoidable stress. If our guides help you arrive a little calmer and
            more informed, we’ve done our job.
          </p>

          <h2 className="text-xl font-semibold text-[#001f42]">A quick note on medical advice</h2>
          <p>
            ClinicInfo does not provide diagnosis or treatment. Content on this
            site is for general educational purposes only. For medical concerns
            and emergencies, contact a qualified healthcare professional or your
            local emergency services.
          </p>

          <p>
            If you would like to reach us, visit our Contact page and send a
            message — we read every note.
          </p>
        </div>
      </div>
    </main>
  );
}
