import {Product} from "../adapters/productAdapter.ts";


interface SearchResultsItemProps {
    product: Product;
}

const SearchResultItem = ({product}: SearchResultsItemProps) => {
    return (
        <article className="flex gap-4 p-4 border-b border-gray-300">
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

            <div className="flex-1">
                <h2 className="text-lg font-bold">
                    <a
                        href={`/items/${product.id}`}
                        aria-label={`Ver detalles de ${product.title}`}
                        className="text-gray-900 hover:underline"
                    >
                        {product.title}
                    </a>
                </h2>

                <p className="text-xl font-bold text-green-600">
                    <span aria-label={`Precio: ${product.price} dólares`}>
                        ${product.price}
                    </span>
                </p>
            </div>
        </article>
    );
};

export default SearchResultItem;