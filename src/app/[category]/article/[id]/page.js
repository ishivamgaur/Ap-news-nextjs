const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

import { getArticleDetailsById } from "@/data/newsData";
import ArticleClient from "./ArticleClient";

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
  try {
    const { id, category } = await params;
    
    console.log('Vercel Params:', { id, category });

    const response = await getArticleDetailsById(id);

    if (!response?.data?.article) {
      return (
        <div className="text-center py-10">
          <h1 className="text-2xl font-bold">404 - Article Not Found</h1>
          <p>Article ID: {id} not found.</p>
        </div>
      );
    }

    const article = transformNewsItem(response.data.article);
    return <ArticleClient article={article} />;
    
  } catch (err) {
    console.error("Vercel Production Error:", err);
    return (
      <div className="text-center py-10 text-red-500">
        <h1 className="text-2xl font-bold">500 - Production Error</h1>
        <p>Please check Vercel logs for details.</p>
      </div>
    );
  }
}

// Yeh add karo - Vercel ko batayega ki yeh dynamic route hai
export async function generateStaticParams() {
  return [];
}