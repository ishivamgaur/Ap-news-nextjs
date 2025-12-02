export default async function sitemap() {
  const baseUrl = "https://apnewsbihar.in"; // Replace with your actual domain

  // Static routes
  const routes = [
    "",
    "/technology",
    "/sports",
    "/business",
    "/bhojpuri",
    "/elections",
    "/videos",
    "/live",
    "/news",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily",
    priority: route === "" ? 1 : 0.8,
  }));

  // Fetch articles for dynamic routes
  // Note: In a real scenario, you might want to fetch all or a significant number of recent articles
  // For this implementation, we'll fetch the latest ones to populate the sitemap
  let articles = [];
  try {
    const res = await fetch(
      "https://ap-news-b.onrender.com/api/articles/all?page=1&limit=50",
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );
    if (res.ok) {
      const data = await res.json();
      articles = data.items || [];
    }
  } catch (error) {
    console.error("Failed to fetch articles for sitemap:", error);
  }

  const articleRoutes = articles.map((article) => ({
    url: `${baseUrl}/article/${article.category}/${article._id}`,
    lastModified:
      article.updatedAt || article.publishAt || new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...routes, ...articleRoutes];
}
