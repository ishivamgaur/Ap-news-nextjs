// src/components/SidebarScoreWidget.jsx
import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import AdComponent from "./AdComponent";
import Link from "next/link";

const SidebarScoreWidget = () => {
  const { language } = useLanguage();

  // --- Countdown Logic ---
  // NOTE: Set your target election date here.
  const electionDate = new Date("2025-11-14T00:00:00");

  const calculateTimeLeft = () => {
    const difference = +electionDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        min: Math.floor((difference / 1000 / 60) % 60),
        sec: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear the timer if the component is unmounted
    return () => clearTimeout(timer);
  });
  // --- End of Countdown Logic ---

  return (
    <aside
      className="hidden lg:flex flex-col sticky top-16 w-64 p-2 py-4 bg-white border-r border-gray-300 shadow-lg"
      style={{ height: "calc(100vh - 4rem)" }} // 100vh - top-16 (4rem)
    >
      {/* Non-scrollable Election Countdown Section */}
      <div className="shrink-0">
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
          <div className="flex mb-2 justify-center items-center">
            <span className="relative flex h-4 w-4 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-green-600"></span>
            </span>
          </div>

          {Object.keys(timeLeft).length > 0 ? (
            <div className="grid grid-cols-4 gap-2 text-center">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div
                  key={unit}
                  className="bg-red-700 p-2 rounded-md shadow-inner"
                >
                  <div className="text-xl font-bold text-white">{value}</div>
                  <div className="text-xs text-gray-200 capitalize">
                    {language === "hi"
                      ? {
                          days: "दिन",
                          hours: "घंटे",
                          min: "मिनट",
                          sec: "सेकंड",
                        }[unit]
                      : unit}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Link
              href={"/election-results"}
              className="text-lg text-center block hover:underline text-green-600 font-semibold"
            >
              {language === "hi" ? "चुनाव परिणाम" : "Election Results"}
            </Link>
          )}
        </div>
      </div>

      {/* Scrollable Cricket and Ads Section */}
      <div className="grow overflow-y-auto pb-20 mt-4 space-y-4">
        {/* Live Cricket Scores */}
        <div
          aria-label={
            language === "hi" ? "लाइव क्रिकेट स्कोर" : "Live Cricket Scores"
          }
        >
          <div className="mb-3">
            <h2 className="text-lg font-bold text-red-700 text-left">
              {language === "hi" ? "लाइव क्रिकेट स्कोर" : "Live Cricket Scores"}
            </h2>
          </div>

          <div className="rounded-md overflow-hidden shadow-sm border-2 border-red-100 bg-red-50">
            <iframe
              src="https://cwidget.crictimes.org/?v=1.1&a=de0c0c"
              title={
                language === "hi" ? "लाइव क्रिकेट स्कोर" : "Live Cricket Scores"
              }
              className="w-full min-h-[460px] h-full"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>
        </div>

     
        <AdComponent
          adImage="https://api.microlink.io/?url=https://www.amazon.in&screenshot=true&embed=screenshot.url"
          title="Amazon"
          adLink="https://www.amazon.in/"
        />
        <AdComponent
          adImage="https://api.microlink.io/?url=https://www.makemytrip.com/&screenshot=true&embed=screenshot.url"
          title="MakeMyTrip"
          adLink="https://www.makemytrip.com/"
        />
        <AdComponent
          adImage="https://api.microlink.io/?url=https://www.zomato.com/ncr&screenshot=true&embed=screenshot.url"
          title="Zomato"
          adLink="https://www.zomato.com/"
        />
        <AdComponent
          adImage="https://api.microlink.io/?url=https://www.nykaa.com/&screenshot=true&embed=screenshot.url"
          title="Nykaa"
          adLink="https://www.nykaa.com/"
        />
      </div>
    </aside>
  );
};

export default SidebarScoreWidget;
