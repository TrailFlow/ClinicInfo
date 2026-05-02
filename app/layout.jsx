import "./globals.css";
import Script from "next/script";
import AdsenseAd from "@/components/AdsenseAd";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollReset from "@/components/ScrollReset";

export const viewport = {
  themeColor: "#001f42",
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL("https://clinicinfo.trailflow.in"),
  title: {
    default: " ClinicInfo  - Top Multispecialty Hospitals",
    template: "%s |  ClinicInfo  ",
  },
  description:
    "Top multispecialty hospital articles, clinic guides, and patient health information.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: " ClinicInfo   - Top Multispecialty Hospitals",
    description:
      "Top multispecialty hospital articles, clinic guides, and patient health information.",
    url: "https://clinicinfo.trailflow.in",
    siteName: "ClinicInfo",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-8620071569452620" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8620071569452620"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-screen bg-[#edf4fb] text-[#001f42] antialiased">
        <Header />
        <AdsenseAd pId="8620071569452620" slotId="7601032301" />
        {children}
        <Footer />
        <ScrollReset />
        <ScrollToTop />
        {/* <FixedAdUnit pId="8620071569452620" slotId="7601032301" /> */}
      </body>
    </html>
  );
}
