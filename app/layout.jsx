import "./globals.css";
import Script from "next/script";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import AdsenseAd from "@/components/AdsenseAd";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollReset from "@/components/ScrollReset";
import PageTransition from "@/components/PageTransition";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const viewport = {
  themeColor: "#001f42",
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL("https://clinicinfo.trailflow.in"),
  title: {
    default: "ClinicInfo - Top Multispecialty Hospitals",
    template: "%s | ClinicInfo",
  },
  description:
    "Top multispecialty hospital articles, clinic guides, and patient health information.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "ClinicInfo - Top Multispecialty Hospitals",
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SHX1REHV63"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-SHX1REHV63', { send_page_view: false });`}
        </Script>
      </head>
      <body
        className={`${inter.variable} ${bricolage.variable} min-h-screen antialiased`}
      >
        <ThemeProvider>
          <GoogleAnalytics />
          <Header />
          <AdsenseAd pId="8620071569452620" slotId="7601032301" />
          <PageTransition>{children}</PageTransition>
          <Footer />
          <ScrollReset />
          <ScrollToTop />
          {/* <FixedAdUnit pId="8620071569452620" slotId="7601032301" /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
