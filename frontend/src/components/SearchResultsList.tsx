import SearchResultsItem from "./SearchResultsItem";
import {Product} from "../adapters/productAdapter.ts";

interface SearchResultsListProps {
    results: Product[]
}

const SearchResultsList = ({results}: SearchResultsListProps) => {
    return (
        <ul className="grid grid-cols-12 gap-4">
            {results.map((product: Product) => (
                <SearchResultsItem key={product.id} product={product} />
            ))}
        </ul>
    );
};

export default SearchResultsList;