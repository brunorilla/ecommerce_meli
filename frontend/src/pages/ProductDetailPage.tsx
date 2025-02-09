import {useParams} from "react-router-dom";
import {useProductDetail} from "../hooks/useProductDetail";
import {useTranslation} from "react-i18next";

const ProductDetailPage = () => {
    const {id} = useParams();
    const {loading, selectedProduct, error} = useProductDetail(id || "");
    const {t} = useTranslation()
    if (loading) return <p>Cargando detalles...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!selectedProduct) return <p>Producto no encontrado.</p>;

    return (
        <div>
            <h2>{selectedProduct.title}</h2>
            <img src={selectedProduct.imageUrl} alt={selectedProduct.title}/>
            <p>{t('product_detail.price')} ${selectedProduct.price}</p>
            <p>{t('product_detail.condition')} {selectedProduct.condition === "new" ? "Nuevo" : "Usado"}</p>
            <p>{t('product_detail.delivery')} {selectedProduct.freeShipping ? "Gratis" : "No incluido"}</p>
            <p>{t('product_detail.description')} {selectedProduct.description}</p>
        </div>
    );
};

export default ProductDetailPage;