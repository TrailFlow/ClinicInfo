export const metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for ClinicInfo - Learn how we collect, use, and protect your data.",
};

export default function PrivacyPolicy() {
  return (
    <main className="mx-auto max-w-[900px] px-5 py-12 md:py-20">
      <div className="rounded-2xl bg-white p-8 shadow-sm md:p-12">
        <h1 className="mb-8 text-3xl font-bold text-[#001f42] md:text-4xl">
          Privacy Policy
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

          <section>
            <h2 className="text-xl font-semibold text-[#001f42]">
              1. Introduction
            </h2>
            <p>
              Welcome to ClinicInfo. We are committed to protecting your
              personal information and your right to privacy. If you have any
              questions or concerns about this privacy notice, or our practices
              with regards to your personal information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#001f42]">
              2. Information We Collect
            </h2>
            <p>
              We collect personal information that you voluntarily provide to us
              when you register on the website, express an interest in obtaining
              information about us or our products and services, or otherwise
              when you contact us.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Personal Data:</strong> Name, email address, and contact
                details when you subscribe to our newsletter or leave comments.
              </li>
              <li>
                <strong>Usage Data:</strong> We automatically collect certain
                information when you visit, use, or navigate the website. This
                information does not reveal your specific identity but may
                include device and usage information, such as your IP address,
                browser and device characteristics, operating system, language
                preferences, referring URLs, device name, country, location, and
                other technical information.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#001f42]">
              3. How We Use Your Information
            </h2>
            <p>
              We use personal information collected via our website for a
              variety of business purposes described below:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To facilitate account creation and logon process.</li>
              <li>
                To send you marketing and promotional communications (if you
                have opted in).
              </li>
              <li>To respond to user inquiries and offer support.</li>
              <li>To post testimonials with your consent.</li>
              <li>To deliver targeted advertising to you.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#001f42]">
              4. Cookies and Tracking Technologies
            </h2>
            <p>
              We may use cookies and similar tracking technologies to access or
              store information. Specific information about how we use such
              technologies and how you can refuse certain cookies is set out in
              our Cookie Notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#001f42]">
              5. Your Privacy Rights
            </h2>
            <p>
              In some regions, such as the European Economic Area (EEA) and
              United Kingdom (UK), you have rights that allow you greater access
              to and control over your personal information. You may review,
              change, or terminate your account at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#001f42]">
              6. Contact Us
            </h2>
            <p>
              If you have questions or comments about this notice, you may
              contact us through our website contact form.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
