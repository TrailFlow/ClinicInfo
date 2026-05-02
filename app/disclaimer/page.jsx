export const metadata = {
  title: "Disclaimer",
  description:
    "Medical Disclaimer for ClinicInfo - Important information regarding our health-related content.",
};

export default function Disclaimer() {
  return (
    <main className="mx-auto max-w-[900px] px-5 py-12 md:py-20">
      <div className="rounded-2xl bg-white p-8 shadow-sm md:p-12">
        <h1 className="mb-8 text-3xl font-bold text-[#001f42] md:text-4xl">
          Disclaimer
        </h1>

        <div className="prose prose-slate max-w-none space-y-6 text-[16px] leading-relaxed text-slate-600">
          <p>
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>

          <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-6 text-amber-900">
            <h2 className="mt-0 text-lg font-bold text-amber-900">
              Medical Disclaimer
            </h2>
            <p className="mb-0">
              The information provided on ClinicInfo is for general
              informational and educational purposes only and is not a
              substitute for professional advice. Accordingly, before taking any
              actions based upon such information, we encourage you to consult
              with the appropriate professionals.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-semibold text-[#001f42]">
              1. No Professional Advice
            </h2>
            <p>
              ClinicInfo does not contain medical/health advice. The
              medical/health information is provided for general informational
              and educational purposes only and is not a substitute for
              professional advice.
            </p>
            <p>
              The use or reliance of any information contained on this site is
              solely at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#001f42]">
              2. External Links Disclaimer
            </h2>
            <p>
              The Site may contain (or you may be sent through the Site) links
              to other websites or content belonging to or originating from
              third parties or links to websites and features in banners or
              other advertising. Such external links are not investigated,
              monitored, or checked for accuracy, adequacy, validity,
              reliability, availability or completeness by us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#001f42]">
              3. Professional Disclaimer
            </h2>
            <p>
              The Site cannot and does not contain medical advice. The medical
              information is provided for general informational and educational
              purposes only and is not a substitute for professional medical
              advice.
            </p>
            <p>
              Accordingly, before taking any actions based upon such
              information, we encourage you to consult with the appropriate
              medical professionals. THE USE OR RELIANCE OF ANY INFORMATION
              CONTAINED ON THIS SITE IS SOLELY AT YOUR OWN RISK.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#001f42]">
              4. Testimonials Disclaimer
            </h2>
            <p>
              The Site may contain testimonials by users of our products and/or
              services. These testimonials reflect the real-life experiences and
              opinions of such users. However, the experiences are personal to
              those particular users, and may not necessarily be representative
              of all users of our products and/or services. We do not claim, and
              you should not assume, that all users will have the same
              experiences.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#001f42]">
              5. Errors and Omissions Disclaimer
            </h2>
            <p>
              While we have made every attempt to ensure that the information
              contained in this site has been obtained from reliable sources,
              ClinicInfo is not responsible for any errors or omissions, or for
              the results obtained from the use of this information.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
