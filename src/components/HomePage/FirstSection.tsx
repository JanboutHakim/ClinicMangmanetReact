import {useAuth} from "../../contexts/ContextsAuth";
import {useTranslation} from "react-i18next";
import {COLORS} from "../../constants/appConfig";

const FirstSection = () => {
    const { t, i18n } = useTranslation();

    const toggleLang = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
    };
    return (
    <div className="relative bg-blue-600 text-white h-[500px] overflow-hidden rounded-b-3xl"
         style={{ backgroundColor: COLORS.primary }}>
        {/* Left Side Content */}
        <div className="relative z-10  pt-32 flex flex-col items-center justify-center text-center px-10 py-16 max-w-2xl mx-auto space-y-8">
            <h1 className="text-3xl md:text-4xl font-bold">{t('title')}</h1>

            {/* Search bar */}
            <div className="w-full max-w-2xl mt-80 mx-auto flex flex-col md:flex-row bg-white rounded-full overflow-hidden shadow-lg">
                <input
                    type="text"
                    placeholder={t('searchPlaceholder')}
                    className="flex-1 px-8 py-5 text-lg text-gray-700 outline-none"
                />
                <button className="bg-blue-900 text-white px-8 py-5 text-lg font-semibold hover:bg-blue-800 transition"
                        style={{ backgroundColor: COLORS.secondary }}>
                    {t('searchButton')}
                </button>
            </div>

        </div>

    </div>
    )
}

export default FirstSection;