import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchProducts } from "../hooks/useSearchProducts";
import SearchResultsList from "../components/SearchResultsList";
import LoadingScreen from "../components/LoadingScreen.tsx";
import ErrorMessage from "../components/ErrorMessage.tsx";

const CONSULTAS_ALEATORIAS = ["celular", "notebook", "auriculares", "cámara", "zapatillas", "reloj", "tablet", "mochila"];

const HomePage = () => {
    const { t } = useTranslation();
    const [randomQuery, setRandomQuery] = useState("");

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * CONSULTAS_ALEATORIAS.length);
        setRandomQuery(CONSULTAS_ALEATORIAS[randomIndex]);
    }, []);

    const { loading, searchResults, error } = useSearchProducts(randomQuery);

    if (loading) return <LoadingScreen />;
    if (error) return <ErrorMessage message={t("error_api_message")} />;
    if (!searchResults.length) return <ErrorMessage message={t("no_products_found")} />;

    return (
        <main className="container mx-auto px-4 bg-white">
            <SearchResultsList results={searchResults} />
        </main>
    );
};

export default HomePage;