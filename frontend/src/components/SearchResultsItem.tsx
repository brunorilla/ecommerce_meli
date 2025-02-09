import {Product} from "../adapters/productAdapter.ts";


interface SearchResultsItemProps {
    product: Product;
}

const SearchResultItem = ({product}: SearchResultsItemProps) => {
    return (
        <li className="col-span-12 p-4 border-b border-gray-200">
            <a href={`/items/${product.id}`} className="flex items-center gap-4">
                <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-[180px] h-[180px] object-cover rounded-md"
                />

                <div>
                    <p className="text-xl font-bold text-gray-900">${product.price}</p>
                    <p className="text-md text-gray-700">{product.title}</p>

                </div>
            </a>
        </li>
    );
};

export default SearchResultItem;