import React from 'react';

interface FeatureProps {
    imageSrc: string;
    title: string;
    text: string;
}

const Feature: React.FC<FeatureProps> = ({ imageSrc, title, text }) => {
    return (
        <div className="flex flex-col items-center text-center px-4 max-w-sm">
            <img src={imageSrc} alt="" className="w-20 h-20 mb-4" />
            <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-600">{text}</p>
        </div>
    );
};

export default Feature;
