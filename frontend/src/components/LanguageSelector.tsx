import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
    const { t, i18n } = useTranslation();


    const changeLanguage = async (lng: string) => {
        await i18n.changeLanguage(lng);
    };

    return (
        <section  className={'col-span-1 flex justify-center'}>
            <label htmlFor="language-selector" className="sr-only">{t('select_language')}</label>
            <select id={"language-selector"} value={i18n.language} onChange={(e) => changeLanguage(e.target.value)}>
                <option value="es">🇪🇸 Español</option>
                <option value="en">🇬🇧 English</option>
                <option value="pt">🇧🇷 Português</option>
            </select>
        </section>
    );
};

export default LanguageSelector;