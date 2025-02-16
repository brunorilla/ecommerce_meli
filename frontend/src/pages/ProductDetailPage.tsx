import {useParams} from "react-router-dom";
import {useProductDetail} from "../hooks/useProductDetail";
import Product from "../components/ProductDetail.tsx";
import Breadcrumb from "../components/Breadcrumb.tsx";
import LoadingScreen from "../components/LoadingScreen.tsx";
import ErrorMessage from "../components/ErrorMessage.tsx";
import {useTranslation} from "react-i18next";

const ProductDetailPage = () => {
    const {t} = useTranslation()
    const {id} = useParams();
    const {loading, selectedProduct, error} = useProductDetail(id || "");
    if (loading) return <LoadingScreen/>;
    if (error) return <ErrorMessage message={t("error_api_message")}/>;
    if (!selectedProduct) return <ErrorMessage message={t("no_products_found")}/>;
    return (
        <main className="container mx-auto p-4">
            <Breadcrumb categories={selectedProduct.categories}/>
            <Product product={selectedProduct}/>
        </main>
    );
};

export default ProductDetailPage;