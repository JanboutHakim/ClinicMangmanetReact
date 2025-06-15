// src/pages/HomePage.tsx
import React from 'react';
import { useAuth } from '../contexts/ContextsAuth';
import { useTranslation } from 'react-i18next';
import Navbar from "../components/Navbar"; // right-side doctor image
import FirstSection from "../components/HomePage/FirstSection"
import SecondSection from "../components/HomePage/SecondSection";
import ThirdSection from "../components/HomePage/ThirdSection";
import FooterSection from "../components/HomePage/FooterSection";

const HomePage: React.FC = () => {
    const { user } = useAuth();
    const { t, i18n } = useTranslation();

    const toggleLang = () => {
        const newLang = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Navbar */}
          <Navbar/>
          <FirstSection/>
          <SecondSection/>
          <ThirdSection/>
          <FooterSection/>
        </div>
    );
};

export default HomePage;
