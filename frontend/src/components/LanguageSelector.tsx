import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className={'col-span-1 flex justify-center'}>
            <select value={i18n.language} onChange={(e) => changeLanguage(e.target.value)}>
                <option value="es">🇪🇸 Español</option>
                <option value="en">🇬🇧 English</option>
                <option value="pt">🇧🇷 Português</option>
            </select>
        </div>
    );
};

export default LanguageSelector;