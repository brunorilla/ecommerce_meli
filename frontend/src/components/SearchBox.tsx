import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiOutlineSearch } from "react-icons/hi";


const SearchBox = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/items?search=${query}`);
        }
    };

    return (
        <div className={'col-span-10'}>
            <form onSubmit={handleSearch} className="flex w-full max-w-6xl bg-white border border-gray-300 rounded-md shadow-sm overflow-hidden">
                <input
                    type="text"
                    placeholder={t("search_placeholder")}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full px-4 py-2 text-mlGray bg-white outline-none"
                />
                <button type="submit" className="bg-mlLightGray px-4 flex items-center justify-center"><HiOutlineSearch className="text-mlDark" /></button>
            </form>
        </div>
    );
};

export default SearchBox;