import {useTranslation} from "react-i18next";

const HomePage = () => {
    const {t} = useTranslation()

    return (
        <main className={"flex justify-center items-center h-screen text-mlDark font-sans"}>
            <p className={"text-lg"}>{t("homepage_message")}</p>
        </main>
    );
};

export default HomePage;