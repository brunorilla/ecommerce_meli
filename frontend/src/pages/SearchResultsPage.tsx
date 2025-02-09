import { useSearchParams } from "react-router-dom";
import { useSearchProducts } from "../hooks/useSearchProducts";
import { useTranslation } from "react-i18next";
import SearchResultsList from "../components/SearchResultsList";

const SearchResultsPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("search") || "";
    const { loading, searchResults, error } = useSearchProducts(query);
    const { t } = useTranslation();

    if (loading) return <p className="text-center text-gray-600">{t("loading_products")}</p>;
    if (error) return <p className="text-center text-red-500">{t("error")}: {error}</p>;
    if (!searchResults.length) return <p className="text-center text-gray-600">{t("no_products_found")}</p>;

    return (
        <div className="container mx-auto px-4 bg-white">
            <SearchResultsList results={searchResults} />
        </div>
    );
};

export default SearchResultsPage;