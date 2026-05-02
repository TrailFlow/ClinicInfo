export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_next/", "/api/"],
      },
    ],
    sitemap: "https://clinicinfo.trailflow.in/sitemap.xml",
  };
}
