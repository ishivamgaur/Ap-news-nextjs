import {
  FaHome,
  FaNewspaper,
  FaBriefcase,
  FaTrophy,
  FaMicrochip,
  FaBookOpen,
  FaMusic,
  FaTv,
  FaMapMarkerAlt,
  FaVoteYea,
  FaVideo,
  FaFilm,
  FaBroadcastTower,
  FaStar,
} from "react-icons/fa";

import { MdSmartphone, MdSportsCricket, MdSportsHockey } from "react-icons/md";
import { IoFootballSharp } from "react-icons/io5";
import { IoIosBasketball } from "react-icons/io";
import { FaBrain } from "react-icons/fa6";
import { PiLaptopBold } from "react-icons/pi";
import { FaPersonBooth } from "react-icons/fa";
import { GiBrain, GiMaterialsScience } from "react-icons/gi";

export const navLinks = [
  //
  {
    name: { en: "HOME", hi: "होम" },
    path: "/",
    icon: FaHome,
    origin: "left",
  },
  // NEWS
  //
  {
    name: { en: "NEWS", hi: "समाचार" },
    path: "/news",
    icon: FaNewspaper,
    origin: "left",

    categories: [
      {
        name: { en: "Bhojpuri", hi: "भोजपुरी" },
        path: "/bhojpuri",
        icon: FaMusic,
        description: {
          en: "Trending Bhojpuri news and entertainment updates.",
          hi: "ट्रेंडिंग भोजपुरी समाचार और मनोरंजन अपडेट।",
        },
      },
      {
        name: { en: "Business", hi: "व्यापार" },
        path: "/business",
        icon: FaBriefcase,
        description: {
          en: "Latest business, finance and economy news.",
          hi: "ताज़ा व्यापार, वित्त और अर्थव्यवस्था समाचार।",
        },
      },
      {
        name: { en: "Elections", hi: "चुनाव" },
        path: "/elections",
        icon: FaVoteYea,
        description: {
          en: "Election updates, results and political news.",
          hi: "चुनाव अपडेट, परिणाम और राजनीतिक समाचार।",
        },
      },
      {
        name: { en: "Technology", hi: "टेक्नोलॉजी" },
        path: "/technology",
        icon: FaMicrochip,
        description: {
          en: "Latest tech news, gadgets and innovations.",
          hi: "ताज़ा टेक न्यूज़, गैजेट्स और नवाचार।",
        },
      },
      {
        name: { en: "Education", hi: "शिक्षा" },
        path: "/education",
        icon: FaBookOpen,
        description: {
          en: "Education news, exams and career updates.",
          hi: "शिक्षा समाचार, परीक्षा और करियर अपडेट।",
        },
      },
    ],
  },

  //
  // SPORTS
  //
  {
    name: { en: "SPORTS", hi: "खेल" },
    path: "/sports",
    icon: FaTrophy,
    origin: "left",

    categories: [
      {
        name: { en: "Cricket", hi: "क्रिकेट" },
        path: "/sports/cricket",
        icon: MdSportsCricket,
        description: {
          en: "Latest cricket matches, players & score updates.",
          hi: "ताज़ा क्रिकेट मैच, खिलाड़ी और स्कोर अपडेट।",
        },
      },
      {
        name: { en: "Football", hi: "फुटबॉल" },
        path: "/sports/football",
        icon: IoFootballSharp,
        description: {
          en: "Football leagues, match results & transfer news.",
          hi: "फुटबॉल लीग, मैच परिणाम और ट्रांसफ़र समाचार।",
        },
      },
      {
        name: { en: "Hockey", hi: "हॉकी" },
        path: "/sports/hockey",
        icon: MdSportsHockey,
        description: {
          en: "Indian & international hockey match highlights.",
          hi: "भारतीय और अंतरराष्ट्रीय हॉकी मैच हाइलाइट्स।",
        },
      },
      {
        name: { en: "Basketball", hi: "बास्केटबॉल" },
        path: "/sports/basketball",
        icon: IoIosBasketball,
        description: {
          en: "NBA, global leagues & basketball news.",
          hi: "एनबीए, वैश्विक लीग और बास्केटबॉल समाचार।",
        },
      },
    ],
  },

  //
  // ENTERTAINMENT
  //
  {
    name: { en: "ENTERTAINMENT", hi: "मनोरंजन" },
    path: "/entertainment",
    icon: FaTv,
    origin: "right",
    categories: [
      {
        name: { en: "Videos", hi: "वीडियो" },
        path: "/entertainment/videos",
        icon: FaVideo,
        description: {
          en: "Watch latest viral and trending videos.",
          hi: "ताज़ा वायरल और ट्रेंडिंग वीडियो देखें।",
        },
      },
      {
        name: { en: "Shorts", hi: "शॉर्ट्स" },
        path: "/entertainment/shorts",
        icon: MdSmartphone,
        description: {
          en: "Quick entertainment bites and shorts.",
          hi: "त्वरित मनोरंजन बाइट्स और शॉर्ट्स।",
        },
      },
      {
        name: { en: "Movies", hi: "फिल्में" },
        path: "/entertainment/movies",
        icon: FaFilm,
        description: {
          en: "Movie reviews, trailers and cinema news.",
          hi: "फिल्म समीक्षा, ट्रेलर और सिनेमा समाचार।",
        },
      },
      {
        name: { en: "Shows", hi: "शो" },
        path: "/entertainment/shows",
        icon: FaTv,
        description: {
          en: "TV shows, web series and OTT updates.",
          hi: "टीवी शो, वेब सीरीज और ओटीटी अपडेट।",
        },
      },
      {
        name: { en: "Music", hi: "संगीत" },
        path: "/entertainment/music",
        icon: FaMusic,
        description: {
          en: "Latest songs, albums and music reviews.",
          hi: "ताज़ा गाने, एल्बम और संगीत समीक्षा।",
        },
      },
      {
        name: { en: "Radio", hi: "रेडियो" },
        path: "/entertainment/radio",
        icon: FaBroadcastTower,
        description: {
          en: "Live radio stations and podcasts.",
          hi: "लाइव रेडियो स्टेशन और पॉडकास्ट।",
        },
      },
      {
        name: { en: "Celebrity", hi: "सेलिब्रिटी" },
        path: "/entertainment/celebrity",
        icon: FaStar,
        description: {
          en: "Celebrity gossip, interviews and lifestyle.",
          hi: "सेलिब्रिटी गपशप, साक्षात्कार और जीवन शैली।",
        },
      },
    ],
  },
];
