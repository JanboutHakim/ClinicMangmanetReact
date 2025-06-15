import React from "react";
import { useTranslation } from "react-i18next";
import Feature from "./FeuatreProbs";
import iconCalendar from '../../assets/calendar.svg';
import iconChat from '../../assets/chat.svg';
import iconHeart from '../../assets/heart.svg';

const ThirdSection = () => {
    const { t } = useTranslation();

    const features = t('features', { returnObjects: true }) as {
        title: string;
        text: string;
    }[];

    return (
        <div className="p-24 bg-gray-100 text-center">
            <h2 className="text-2xl font-bold mb-12">{t('title')}</h2>

            <div className="flex flex-col md:flex-row justify-center gap-10">
                <Feature
                    imageSrc={iconCalendar}
                    title={features[0].title}
                    text={features[0].text}
                />
                <Feature
                    imageSrc={iconChat}
                    title={features[1].title}
                    text={features[1].text}
                />
                <Feature
                    imageSrc={iconHeart}
                    title={features[2].title}
                    text={features[2].text}
                />
            </div>
        </div>
    );
};

export default ThirdSection;
