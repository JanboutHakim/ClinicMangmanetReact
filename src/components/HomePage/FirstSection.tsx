import {useAuth} from "../../contexts/ContextsAuth";
import {useTranslation} from "react-i18next";
import { COLORS } from "../../constants/theme";
import SearchBar from "../SearchBar";

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

            <SearchBar className="max-w-2xl mt-80 mx-auto" />

        </div>

    </div>
    )
}

export default FirstSection;
