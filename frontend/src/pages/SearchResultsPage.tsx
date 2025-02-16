import { useSearchParams } from "react-router-dom";
import { useSearchProducts } from "../hooks/useSearchProducts";
import { useTranslation } from "react-i18next";
import SearchResultsList from "../components/SearchResultsList";
import Breadcrumb from "../components/Breadcrumb.tsx";
import LoadingScreen from "../components/LoadingScreen.tsx";
import ErrorMessage from "../components/ErrorMessage.tsx";

const SearchResultsPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const { loading, searchResults, error, categories } = useSearchProducts(query, category);
    const { t } = useTranslation();

    if (loading)  return <LoadingScreen />;
    if (error) return <ErrorMessage message={t("error_api_message")} />;
    if (!searchResults.length) return <ErrorMessage message={t("no_products_found")} />;
    return (
        <section className="container mx-auto px-4 bg-white">
            <Breadcrumb categories={categories} />
            <SearchResultsList results={searchResults} />
        </section>
    );
};

export default SearchResultsPage;