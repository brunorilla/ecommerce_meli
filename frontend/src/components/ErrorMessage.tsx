import {useTranslation} from "react-i18next";

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
    const {t} = useTranslation()
    return (
        <div className="flex flex-col items-center justify-center p-6">
            <p className="text-red-500 text-lg font-semibold">{message}</p>
            <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-mlYellow text-black font-semibold rounded-md hover:bg-yellow-400 transition"
            >
                {t('reload_page')}
            </button>
        </div>
    );
};

export default ErrorMessage;