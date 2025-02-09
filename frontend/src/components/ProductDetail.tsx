import { useParams } from "react-router-dom";
import { useProductDetail } from "../hooks/useProductDetail";

const ProductDetail = () => {
    const { id } = useParams();
    const { loading, selectedProduct, error } = useProductDetail(id || "");

    if (loading) return <p>Cargando detalles...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!selectedProduct) return <p>Producto no encontrado.</p>;

    return (
        <div>
            <h2>{selectedProduct.title}</h2>
            <img src={selectedProduct.imageUrl} alt={selectedProduct.title} />
            <p>Precio: ${selectedProduct.price}</p>
            <p>Condición: {selectedProduct.condition === "new" ? "Nuevo" : "Usado"}</p>
            <p>Envío: {selectedProduct.freeShipping ? "Gratis" : "No incluido"}</p>
            <p>Descripción: {selectedProduct.description}</p>
        </div>
    );
};

export default ProductDetail;