import "./globals.css";

import StoreProvider from "@/store/StoreProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import HighlightsBar from "@/components/HighlightsBar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import Head from "next/head";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 🖋️ Fonts (News website combo)
import { Merriweather, Inter } from "next/font/google";

const headingFont = Merriweather({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "700", "900"],
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: [ "500", "600", "700"],
});

// 🧠 Metadata (SEO)
export const metadata = {
  metadataBase: new URL("https://apnewsbihar.in"),
  title: {
    default: "AP News | Latest Updates",
    template: "%s | AP News",
  },
  description:
    "Breaking news, live videos, and updates from AP News. Stay informed with the latest headlines in Technology, Sports, Business, and more.",
  keywords: [
    "News",
    "Breaking News",
    "India News",
    "World News",
    "Technology",
    "Sports",
    "Business",
    "Bhojpuri",
    "Elections",
    "Live News",
  ],
  authors: [{ name: "AP News Team" }],
  creator: "AP News",
  publisher: "AP News",
  openGraph: {
    title: "AP News | Latest Updates",
    description: "Breaking news, live videos, and updates from AP News.",
    url: "https://apnewsbihar.in",
    siteName: "AP News",
    images: [
      {
        url: "/Ap-news.png",
        width: 1200,
        height: 630,
        alt: "AP News Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AP News | Latest Updates",
    description: "Breaking news, live videos, and updates from AP News.",
    images: ["/Ap-news.png"],
    creator: "@apnews",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// 🧱 Root Layout
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <Head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5516481292318087"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        ></Script>
      </Head>
      <body className="antialiased flex flex-col min-h-screen font-body bg-gray-50 text-gray-900">
        <StoreProvider>
          <LanguageProvider>
            <TopBar />
            <Navbar />
            <Breadcrumb />
            <div>{children}</div>
            <HighlightsBar />
            <Footer />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              style={{ zIndex: 999999 }}
            />
          </LanguageProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
