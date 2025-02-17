import { Product } from "../adapters/productAdapter.ts";
import { FaTruck } from "react-icons/fa";

interface SearchResultsItemProps {
    product: Product;
    isLast?: boolean;
}

const SearchResultItem = ({ product, isLast }: SearchResultsItemProps) => {
    return (
        <article className={`flex items-center bg-white p-4 ${!isLast ? "border-b border-gray-300" : ""}`}>
            <figure className="w-[180px] h-[180px] flex-shrink-0">
                <img
                    src={product.imageUrl}
                    alt={product.title}
                    loading="lazy"
                    width="180"
                    height="180"
                    className="w-full h-full object-cover rounded-md"
                />
            </figure>

            <div className="flex-1 flex flex-col justify-between px-4">
                <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-gray-900">${product.price}</p>
                    {product.freeShipping && <FaTruck className="text-green-500" title="Envío gratis" />}
                </div>

                <h2 className="text-lg font-medium text-gray-800">
                    <a
                        href={`/items/${product.id}`}
                        aria-label={`Ver detalles de ${product.title}`}
                        className="hover:underline"
                    >
                        {product.title}
                    </a>
                </h2>
            </div>

            <p className="text-sm text-gray-500 whitespace-nowrap">{product.location}</p>
        </article>
    );
};

export default SearchResultItem;