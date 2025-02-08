import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/items?search=${query}`);
        }
    };

    return (
        <header>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Buscar</button>
            </form>
        </header>
    );
};

export default SearchBox;