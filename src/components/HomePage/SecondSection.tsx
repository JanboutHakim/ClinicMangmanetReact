import AnimatedCard from "../AnimatedCard";
import React from "react";
import {useTranslation} from "react-i18next";

const SecondSection = () => {
    const { t, i18n } = useTranslation();

    const toggleLang = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
    };
    return(
        <div className="p-24 bg-gray-100 min-h-screen/2">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <AnimatedCard>
                    <h3 className="text-xl font-semibold mb-2">Card One</h3>
                    <p className="text-gray-600">This is the content of the first card.</p>
                </AnimatedCard>

                <AnimatedCard>
                    <h3 className="text-xl font-semibold mb-2">Card Two</h3>
                    <p className="text-gray-600">Second card content goes here with smooth hover effect.</p>
                </AnimatedCard>

                <AnimatedCard>
                    <h3 className="text-xl font-semibold mb-2">Card Three</h3>
                    <p className="text-gray-600">The third card completes the row.</p>
                </AnimatedCard>
            </div>
        </div>
    );
}

export default SecondSection;
