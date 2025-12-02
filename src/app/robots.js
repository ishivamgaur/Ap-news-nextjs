export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: "https://apnewsbihar.in/sitemap.xml", // Replace with your actual domain
  };
}
