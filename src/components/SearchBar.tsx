import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../constants/theme';

interface SearchBarProps {
    className?: string;
    onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ className = '', onSearch }) => {
    const { t } = useTranslation();
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch?.(query);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        onSearch?.(value);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`w-full flex flex-col md:flex-row bg-white rounded-full overflow-hidden shadow-lg ${className}`}
        >
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder={t('searchPlaceholder')}
                className="flex-1 px-8 py-5 text-lg text-gray-700 outline-none"
            />
            <button
                type="submit"
                className="bg-blue-900 text-white px-8 py-5 text-lg font-semibold hover:bg-blue-800 transition"
                style={{ backgroundColor: COLORS.secondary }}
            >
                {t('searchButton')}
            </button>
        </form>
    );
};

export default SearchBar;
