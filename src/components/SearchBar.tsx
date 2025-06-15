import React from 'react';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../constants/theme';

const SearchBar: React.FC = () => {
    const { t } = useTranslation();

    return (<div className="w-full max-w-2xl mt-80 mx-auto flex flex-col md:flex-row bg-white rounded-full overflow-hidden shadow-lg">
    <input
        type="text"
        placeholder={t('searchPlaceholder')}
        className="flex-1 px-8 py-5 text-lg text-gray-700 outline-none"
    />
    <button className="bg-blue-900 text-white px-8 py-5 text-lg font-semibold hover:bg-blue-800 transition"
            style={{ backgroundColor: COLORS.secondary }}>
        {t('searchButton')}
    </button>
</div>);
};

export default SearchBar;