import {useParams} from "react-router-dom";
import {useProductDetail} from "../hooks/useProductDetail";
import Product from "../components/ProductDetail.tsx";
import Breadcrumb from "../components/Breadcrumb.tsx";

const ProductDetailPage = () => {
    const {id} = useParams();
    const {loading, selectedProduct, error} = useProductDetail(id || "");
    if (loading) return <p>Cargando detalles...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!selectedProduct) return <p>Producto no encontrado.</p>;

    return (
        <main className="container mx-auto p-4">
            <Breadcrumb categories={selectedProduct.categories} />
            <Product product={selectedProduct} />
        </main>
    );
};

export default ProductDetailPage;