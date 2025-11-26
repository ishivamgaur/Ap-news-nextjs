// src/components/SidebarScoreWidget.jsx
import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import AdComponent from "./AdComponent";
import Link from "next/link";

const SidebarScoreWidget = () => {
  const { language } = useLanguage();

  // --- Countdown Logic ---
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

    return () => clearTimeout(timer);
  });
  // --- End of Countdown Logic ---

  return (
    <aside className="hidden xl:flex flex-col sticky top-20 lg:w-72 xl:w-72 2xl:w-72 p-4 bg-white rounded-xl border border-gray-100 shadow-sm h-[calc(100vh-6rem)]">
      {/* Election Countdown Section */}
      <div className="shrink-0 mb-6">
        <div className="p-5 border border-red-100 rounded-xl bg-red-50/50 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-red-100 rounded-full blur-xl opacity-50"></div>

          <div className="flex mb-4 justify-between items-center">
            <h3 className="font-serif font-bold text-red-800 text-base lg:text-xs xl:text-lg">
              {language === "hi" ? "चुनाव 2025" : "Election 2025"}
            </h3>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
            </span>
          </div>

          {Object.keys(timeLeft).length > 0 ? (
            <div className="grid grid-cols-4 gap-2 text-center">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div
                  key={unit}
                  className="bg-white p-2 rounded-lg shadow-sm border border-red-100 flex flex-col items-center justify-center"
                >
                  <div className="text-xl lg:text-sm xl:text-xl font-bold text-red-700 font-mono leading-none mb-1">
                    {value}
                  </div>
                  <div className="text-[10px] lg:text-[8px] xl:text-[10px] text-gray-500 uppercase font-bold tracking-wider">
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
              className="text-lg lg:text-sm xl:text-lg text-center block hover:underline text-red-700 font-bold bg-white py-2 rounded-lg shadow-sm border border-red-100"
            >
              {language === "hi" ? "चुनाव परिणाम देखें" : "View Results"}
            </Link>
          )}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="grow overflow-y-auto pr-2 space-y-6 scrollbar-hide">
        {/* Live Cricket Scores */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-5 bg-red-700 rounded-full"></div>
            <h2 className="text-lg lg:text-sm xl:text-lg font-bold text-gray-900">
              {language === "hi" ? "लाइव स्कोर" : "Live Scores"}
            </h2>
          </div>

          <div className="rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-gray-50 h-[400px]">
            <iframe
              src="https://cwidget.crictimes.org/?v=1.1&a=de0c0c"
              title={
                language === "hi" ? "लाइव क्रिकेट स्कोर" : "Live Cricket Scores"
              }
              className="w-full h-full"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>
        </div>

        {/* Ads Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Sponsored
            </span>
            <div className="h-px bg-gray-200 grow"></div>
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
      </div>
    </aside>
  );
};

export default SidebarScoreWidget;
