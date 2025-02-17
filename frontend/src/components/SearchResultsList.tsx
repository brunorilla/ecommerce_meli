import SearchResultsItem from "./SearchResultsItem";
import { Product } from "../adapters/productAdapter.ts";

interface SearchResultsListProps {
    results: Product[];
}

const SearchResultsList = ({ results }: SearchResultsListProps) => {
    return (
        <ul className="grid grid-cols-12 gap-4">
            {results.slice(0, 4).map((product: Product, index) => (
                <li className="col-span-12 p-4" key={product.id}>
                    <SearchResultsItem product={product} isLast={index === Math.min(3, results.length - 1)} />
                </li>
            ))}
        </ul>
    );
};

export default SearchResultsList;