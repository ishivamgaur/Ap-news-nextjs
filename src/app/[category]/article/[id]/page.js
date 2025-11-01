import { newsData, newsDataLive, getArticleDetailsById } from "@/data/newsData";
import ArticleClient from "./ArticleClient";

// This helper function transforms the raw API data into the format our components expect.
const transformNewsItem = (item) => ({
  id: item._id,
  title: item.title,
  description: item.summary,
  fullDescription: item.content,
  image: item.featuredImage?.url,
  category: item.category,
  date: item.publishAt,
  youtubeVideoId: item.youtubeVideoId,
});

export default async function ArticleDetailPage({ params }) {
  const { id } = await params;
  console.log("id", id);
  let article;

  try {
    // Fetch all articles from the live API
    const response = await getArticleDetailsById(id);
    console.log("API response:", response.data.article);

    article = response.data.article
      ? transformNewsItem(response.data.article)
      : null;
  } catch (error) {
    console.error("API fetch failed, falling back to static data:", error);
    // If the API fails, try to find the article in the static data
    article = newsData.find((item) => item.id == id);
  }

  if (!article) {
    return <div className="text-center py-20">Article not found.</div>;
  }

  return <ArticleClient article={article} />;
}
