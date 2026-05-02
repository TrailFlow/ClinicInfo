import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#d8dee6] bg-white">
      <div className="mx-auto max-w-[1200px] px-5 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-[15px] text-[#001f42]">
            Copyright © {new Date().getFullYear()} ClinicInfo All rights
            reserved.
          </p>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[14px] font-medium text-[#001f42]/80">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-[#001f42]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/disclaimer"
              className="transition-colors hover:text-[#001f42]"
            >
              Disclaimer
            </Link>
            <Link
              href="/terms-and-conditions"
              className="transition-colors hover:text-[#001f42]"
            >
              Terms & Conditions
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
