import React from 'react';

type SectionCardProps = {
    title?: string;
    children: React.ReactNode;
    actions?: React.ReactNode;
    className?: string;
};

export const SectionCard: React.FC<SectionCardProps> = ({ title, children, actions, className }) => (
    <div className={`bg-white rounded-xl shadow p-6 flex-1 flex flex-col justify-between ${className || ''}`}>
        {(title || actions) && (
            <div className="flex justify-between items-center mb-4">
                {title && <h3 className="font-semibold text-gray-800">{title}</h3>}
                {actions}
            </div>
        )}
        {children}
    </div>
);
