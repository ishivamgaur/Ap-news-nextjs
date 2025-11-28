import { Geist, Geist_Mono } from "next/font/google";
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

// 🖋️ Fonts
import { Merriweather, Inter } from "next/font/google";

// 🖋️ Fonts
const merriweather = Merriweather({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

// 🧠 Metadata (SEO)
export const metadata = {
  title: "AP News | Latest Updates",
  description: "Breaking news, live videos, and updates from AP News.",
};

// 🧱 Root Layout
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5516481292318087"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        ></Script>
      </Head>
      <body
        className={`${merriweather.variable} ${inter.variable} antialiased flex flex-col min-h-screen font-sans bg-gray-50 text-gray-900`}
      >
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
