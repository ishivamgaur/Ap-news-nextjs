const dynamic = "force-dynamic"

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
  const { id, category } = await params; // ✅ no await here
  console.log({id, category});

  try {
    const response = await getArticleDetailsById(id);
    const article = response?.data?.article
      ? transformNewsItem(response.data.article)
      : null;

      console.log("Fetched article:", article);

    if (!article) {
      return <div>Article not found</div>;
    }

    return <ArticleClient article={article} />;
  } catch (err) {
    console.error("Error:", err);
    return <div>Something went wrong</div>;
  }
}
