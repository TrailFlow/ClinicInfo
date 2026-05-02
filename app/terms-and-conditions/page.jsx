export const metadata = {
  title: "Terms and Conditions",
  description:
    "Terms and Conditions for ClinicInfo - User agreement and site usage rules.",
};

export default function TermsAndConditions() {
  return (
    <main className="mx-auto max-w-[900px] px-5 py-12 md:py-20">
      <div className="rounded-2xl bg-white p-8 shadow-sm md:p-12">
        <h1 className="mb-8 text-3xl font-bold text-[#001f42] md:text-4xl">
          Terms and Conditions
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
              1. Agreement to Terms
            </h2>
            <p>
              By accessing or using ClinicInfo, you agree to be bound by these
              Terms and Conditions. If you disagree with any part of the terms,
              then you may not access the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#001f42]">
              2. Intellectual Property Rights
            </h2>
            <p>
              Unless otherwise stated, ClinicInfo and/or its licensors own the
              intellectual property rights for all material on this website. All
              intellectual property rights are reserved. You may access this
              from ClinicInfo for your own personal use subjected to
              restrictions set in these terms and conditions.
            </p>
            <p className="font-semibold mt-2">You must not:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Republish material from ClinicInfo</li>
              <li>Sell, rent or sub-license material from ClinicInfo</li>
              <li>Reproduce, duplicate or copy material from ClinicInfo</li>
              <li>Redistribute content from ClinicInfo</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#001f42]">
              3. User Content
            </h2>
            <p>
              Parts of this website offer an opportunity for users to post and
              exchange opinions and information in certain areas of the website.
              ClinicInfo does not filter, edit, publish or review Comments prior
              to their presence on the website. Comments do not reflect the
              views and opinions of ClinicInfo, its agents and/or affiliates.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#001f42]">
              4. Hyperlinking to our Content
            </h2>
            <p>
              The following organizations may link to our Website without prior
              written approval:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Government agencies;</li>
              <li>Search engines;</li>
              <li>News organizations;</li>
              <li>
                Online directory distributors may link to our Website in the
                same manner as they hyperlink to the Websites of other listed
                businesses.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#001f42]">
              5. Limitation of Liability
            </h2>
            <p>
              In no event shall ClinicInfo, nor any of its officers, directors
              and employees, be held liable for anything arising out of or in
              any way connected with your use of this Website whether such
              liability is under contract. ClinicInfo, including its officers,
              directors and employees shall not be held liable for any indirect,
              consequential or special liability arising out of or in any way
              related to your use of this Website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#001f42]">
              6. Governing Law
            </h2>
            <p>
              These Terms will be governed by and interpreted in accordance with
              the laws of the jurisdiction in which ClinicInfo operates, and you
              submit to the non-exclusive jurisdiction of the state and federal
              courts located in for the resolution of any disputes.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
