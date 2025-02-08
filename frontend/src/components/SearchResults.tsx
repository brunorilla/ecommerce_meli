import { useSearchParams } from "react-router-dom";
import { useSearchProducts } from "../hooks/useSearchProducts";

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("search") || "";
    const { loading, searchResults, error } = useSearchProducts(query);

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!searchResults.length) return <p>No se encontraron productos.</p>;

    return (
        <div>
            <h2>Resultados para "{query}"</h2>
            <ul>
                {searchResults.map((product) => (
                    <li key={product.id}>
                        <a href={`/items/${product.id}`}>
                            <img src={product.picture} alt={product.title} />
                            <p>{product.title} - ${product.price.amount}</p>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResults;