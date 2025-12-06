// data/navLinks.ts

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
  // HOME
  //
  {
    name: { en: "HOME", hi: "होम" },
    path: "/",
    icon: FaHome,
    origin: "left",
  },

  //
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
        path: "/news/bhojpuri",
        icon: FaMusic,
        description: {
          en: "Trending Bhojpuri news and entertainment updates.",
          hi: "ट्रेंडिंग भोजपुरी समाचार और मनोरंजन अपडेट।",
        },
      },
      {
        name: { en: "Business", hi: "व्यापार" },
        path: "/news/business",
        icon: FaBriefcase,
        description: {
          en: "Latest business, finance and economy news.",
          hi: "ताज़ा व्यापार, वित्त और अर्थव्यवस्था समाचार।",
        },
      },
      {
        name: { en: "Entertainment", hi: "मनोरंजन" },
        path: "/news/entertainment",
        icon: FaTv,
        description: {
          en: "Bollywood, TV & OTT entertainment updates.",
          hi: "बॉलीवुड, टीवी और ओटीटी मनोरंजन अपडेट।",
        },
      },
      {
        name: { en: "Local", hi: "स्थानीय" },
        path: "/news/local",
        icon: FaMapMarkerAlt,
        description: {
          en: "Local city news, reports and latest happenings.",
          hi: "स्थानीय शहर समाचार, रिपोर्ट और ताज़ा घटनाएँ।",
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
  // TECHNOLOGY
  //
  {
    name: { en: "TECHNOLOGY", hi: "टेक्नोलॉजी" },
    path: "/technology",
    icon: FaMicrochip,
    origin: "left",
    categories: [
      {
        name: { en: "Gadgets", hi: "गैजेट्स" },
        path: "/technology/gadgets",
        icon: MdSmartphone,
        description: {
          en: "Latest mobiles, laptops and tech gadgets.",
          hi: "ताज़ा मोबाइल, लैपटॉप और टेक गैजेट्स।",
        },
      },
      {
        name: { en: "AI & Machine Learning", hi: "एआई और मशीन लर्निंग" },
        path: "/technology/ai-ml",
        icon: GiBrain,
        description: {
          en: "AI models, ML research and tech innovations.",
          hi: "एआई मॉडल, एमएल रिसर्च और टेक नवाचार।",
        },
      },
      {
        name: { en: "Robotics", hi: "रोबोटिक्स" },
        path: "/technology/robotics",
        icon: FaPersonBooth,
        description: {
          en: "Robotics engineering, automation & humanoids.",
          hi: "रोबोटिक्स इंजीनियरिंग, ऑटोमेशन और ह्यूमैनॉइड्स।",
        },
      },
      {
        name: { en: "Space & Science", hi: "अंतरिक्ष और विज्ञान" },
        path: "/technology/space-science",
        icon: GiMaterialsScience,
        description: {
          en: "ISRO/NASA missions, space research & discoveries.",
          hi: "इसरो/नासा मिशन, अंतरिक्ष शोध और खोजें।",
        },
      },
    ],
  },

  //
  // EDUCATION
  //
  {
    name: { en: "EDUCATION", hi: "शिक्षा" },
    path: "/education",
    icon: FaBookOpen,
    origin: "right",

    categories: [
      {
        name: { en: "Exams", hi: "परीक्षाएँ" },
        path: "/education/exams",
        icon: PiLaptopBold,
        description: {
          en: "Updates on competitive and board exams.",
          hi: "प्रतियोगी और बोर्ड परीक्षाओं के अपडेट।",
        },
      },
      {
        name: { en: "Results", hi: "परिणाम" },
        path: "/education/results",
        icon: FaNewspaper,
        description: {
          en: "Latest board, university & entrance results.",
          hi: "ताज़ा बोर्ड, विश्वविद्यालय और प्रवेश परीक्षा परिणाम।",
        },
      },
      {
        name: { en: "Career", hi: "करियर" },
        path: "/education/career",
        icon: FaBrain,
        description: {
          en: "Career guidance, courses & skill development.",
          hi: "करियर मार्गदर्शन, कोर्स और स्किल डेवलपमेंट।",
        },
      },
      {
        name: { en: "Scholarships", hi: "स्कॉलरशिप" },
        path: "/education/scholarships",
        icon: FaBookOpen,
        description: {
          en: "Govt & private scholarship schemes and updates.",
          hi: "सरकारी और निजी स्कॉलरशिप योजनाएँ और अपडेट।",
        },
      },
    ],
  },
];
