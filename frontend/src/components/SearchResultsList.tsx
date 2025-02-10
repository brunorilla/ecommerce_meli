import SearchResultsItem from "./SearchResultsItem";
import {Product} from "../adapters/productAdapter.ts";

interface SearchResultsListProps {
    results: Product[]
}

const SearchResultsList = ({results}: SearchResultsListProps) => {
    return (
        <ul className="grid grid-cols-12 gap-4">
            {results.map((product: Product) => (
                <li className={"col-span-12 p-4 border-b border-gray-200"} key={product.id}><SearchResultsItem  product={product} /></li>
            ))}
        </ul>
    );
};

export default SearchResultsList;