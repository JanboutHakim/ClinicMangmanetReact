import React from 'react';

export interface Drug {
    drugId: number;
    name: string;
    scientificName: string;
    medicationDosage: string;
    pharmaceuticalForm: string;
    company: string;
}

interface DrugCardProps {
    drug: Drug;
}

const DrugCard: React.FC<DrugCardProps> = ({ drug }) => {
    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b py-4 px-2 hover:bg-gray-50 transition">
            {/* Left: Main Info */}
            <div className="flex-1 space-y-1">
                <h2 className="text-lg font-semibold text-blue-700">{drug.name}</h2>
                <p className="text-sm text-gray-600 italic">{drug.scientificName}</p>
            </div>

            {/* Right: Details */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mt-2 md:mt-0 text-sm text-gray-700">
                <span><strong>Dosage:</strong> {drug.medicationDosage}</span>
                <span><strong>Form:</strong> {drug.pharmaceuticalForm}</span>
                <span><strong>Company:</strong> {drug.company}</span>
            </div>
        </div>
    );
};

export default DrugCard;
