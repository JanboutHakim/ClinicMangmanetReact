import React from 'react';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../../constants/theme';
import {
    logo,
    appStoreIcon,
    googlePlayIcon,
    facebookIcon,
    instagramIcon,
    youtubeIcon,
} from '../../constants/assets';

const Footer: React.FC = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-white border-t py-10 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
                {/* Brand & Description */}
                <div className="flex flex-col items-center md:items-start">
                    <img src={logo} alt="Logo" className="h-10 mb-3" />
                    <p className="text-gray-600 text-sm">
                        {t('footer.description')}
                    </p>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col gap-2">
                    <h4 className="text-base font-semibold mb-2">{t('footer.links')}</h4>
                    <a href="/about" className="text-gray-600 hover:text-blue-600 text-sm">{t('footer.about')}</a>
                    <a href="/contact" className="text-gray-600 hover:text-blue-600 text-sm">{t('footer.contact')}</a>
                    <a href="/terms" className="text-gray-600 hover:text-blue-600 text-sm">{t('footer.terms')}</a>
                </div>

                {/* App Download & Social Icons */}
                <div className="flex flex-col items-center md:items-end gap-3">
                    <h4 className="text-base font-semibold">{t('footer.download')}</h4>

                    {/* App icons side by side */}
                    <div className="flex gap-3">
                        <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
                            <img src={appStoreIcon} alt="App Store" className="h-10" />
                        </a>
                        <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
                            <img src={googlePlayIcon} alt="Google Play" className="h-10" />
                        </a>
                    </div>

                    {/* Social media icons */}
                    <div className="flex gap-4 mt-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <img src={facebookIcon} alt="Facebook" className="h-6 w-6 hover:opacity-80" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <img src={instagramIcon} alt="Instagram" className="h-6 w-6 hover:opacity-80" />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                            <img src={youtubeIcon} alt="YouTube" className="h-6 w-6 hover:opacity-80" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="text-center text-sm text-gray-400 mt-8">
                © {new Date().getFullYear()} Salamtak. {t('footer.rights')}
            </div>
        </footer>
    );
};

export default Footer;
