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
              2. What This Policy Covers
            </h2>
            <p>
              This policy explains what information we collect when you browse
              ClinicInfo, how we use it to operate and improve the site, and how
              advertising partners (including Google AdSense) may collect data
              to display ads. It applies to this website and its pages, and does
              not cover third-party websites you may visit through external
              links.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#001f42]">
              3. Information We Collect
            </h2>
            <p>
              We collect personal information that you voluntarily provide to us
              when you contact us.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Personal Data:</strong> Name, email address, and contact
                details when you contact us.
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
            <p>
              We do not intentionally collect sensitive personal information
              (such as health records). Please do not submit sensitive medical
              details through the contact form.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#001f42]">
              4. How We Use Your Information
            </h2>
            <p>
              We use personal information collected via our website for a
              variety of business purposes described below:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To respond to user inquiries and offer support.</li>
              <li>To maintain site security and prevent abuse.</li>
              <li>To measure performance and improve content and usability.</li>
              <li>
                To support advertising on the site (including displaying ads and
                limiting repeated ads).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#001f42]">
              5. Cookies and Tracking Technologies
            </h2>
            <p>
              We may use cookies and similar tracking technologies to access or
              store information. Specific information about how we use such
              technologies and how you can refuse certain cookies depends on
              your browser and device settings.
            </p>
            <p>
              <strong>Advertising cookies (Google AdSense):</strong> We use
              Google AdSense to show ads. Google and its partners may use
              cookies (or similar identifiers) to serve and measure ads, limit
              the frequency of ads, and personalize ads based on your interests.
              Depending on your location, you may see consent controls.
            </p>
            <p>
              You can usually control cookies through your browser settings. You
              may also manage ad personalization through Google’s ad settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#001f42]">
              6. Third-Party Advertising And Links
            </h2>
            <p>
              Some ads on ClinicInfo are provided by third parties (such as
              Google). Those providers may collect information directly from
              your browser or device and may set or recognize cookies. We do not
              control the technologies used by these third parties, and their
              data practices are governed by their own policies.
            </p>
            <p>
              Our articles may include links to external websites for further
              reading. We are not responsible for the privacy practices of
              third-party sites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#001f42]">
              7. Your Privacy Rights (GDPR/CCPA)
            </h2>
            <p>
              Depending on where you live, you may have legal rights related to
              your personal information. For example, the GDPR (in the EEA/UK)
              and the CCPA/CPRA (in California) provide rights that may include
              access, correction, deletion, and the right to opt out of certain
              types of data processing or targeted advertising.
            </p>
            <p>
              To exercise a request, contact us using the email address below.
              We may ask for reasonable information to verify your identity and
              understand your request.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#001f42]">
              8. Contact Us
            </h2>
            <p>
              If you have questions or comments about this notice, you may
              contact us at <strong>support@clinicinfo.trailflow.in</strong> or
              through our contact form.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
