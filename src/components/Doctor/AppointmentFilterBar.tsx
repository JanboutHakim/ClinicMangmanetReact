import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {statusStyles} from "./DoctorAppointments";
import {getColors} from "../../constants/theme";
import {useTheme} from "../../contexts/ThemeContext";

interface Props {
    onFilterChange: (filters: {
        q: string;
        statuses: string[];
        start?: string;
        end?: string;
    }) => void;
}

const AppointmentFilterBar: React.FC<Props> = ({ onFilterChange }) => {
    const { t } = useTranslation();

    const [q, setQ] = useState('');
    const [status, setStatus] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const {mode} = useTheme()
    const COLORS = getColors(mode);
    // 🔍 Auto-search on query change
    useEffect(() => {
        onFilterChange({
            q,
            statuses: [],
            start: undefined,
            end: undefined
        });
    }, [q]);

    // 🧠 Filter by status and dates only when clicking the button
    const handleFilterApply = () => {
        onFilterChange({
            q,
            statuses: status ? [status.toUpperCase()] : [],
            start: startDate ? new Date(startDate).toISOString() : undefined,
            end: endDate ? new Date(endDate).toISOString() : undefined
        });
    };

    return (
        <div className="flex flex-wrap gap-4 items-end bg-white p-4 rounded-lg shadow mb-4">

        {/* 🔎 Search Box */}
            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1 text-gray-700">{t('search')}</label>
                <input
                    type="text"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder={t('searchPlaceholder') || 'Search by name or doctor'}
                    className="border border-gray-300 rounded px-3 py-2 text-sm w-64 focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>

            {/* ✅ Status Filter */}
            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1 text-gray-700">{t('status')}</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
                >
                    <option value="">{t('all')}</option>
                    {Object.entries(statusStyles).map(([key, { label }]) => (
                        <option key={key} value={key}>
                            {t(label)}
                        </option>
                    ))}
                </select>

            </div>

            {/* 📅 Date From */}
            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1 text-gray-700">{t('dateFrom')}</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>

            {/* 📅 Date To */}
            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1 text-gray-700">{t('dateTo')}</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>

            {/* 🛑 Spacer to push button */}
            <div className="flex-grow"></div>

            {/* 🔘 Apply Filters Button */}
            <div className="flex flex-col">
                <button
                    onClick={handleFilterApply}
                    className="w-10 h-10 flex items-center justify-center rounded-full transition-transform transform hover:scale-110"
                    style={{ backgroundColor: COLORS.secondary }}
                    aria-label="Search"
                >
                    <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <circle cx="11" cy="11" r="7" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </button>
            </div>


        </div>
    );
};

export default AppointmentFilterBar;
