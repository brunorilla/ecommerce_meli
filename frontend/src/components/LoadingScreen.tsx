import {useTranslation} from "react-i18next";


const LoadingScreen = () => {
    const {t} = useTranslation();

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
            <div className="flex flex-col items-center">
                <div
                    className="w-16 h-16 border-4 border-mlYellow border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-mlGray text-lg font-semibold">{t("loading")}</p>
            </div>
        </div>
    );
};

export default LoadingScreen;