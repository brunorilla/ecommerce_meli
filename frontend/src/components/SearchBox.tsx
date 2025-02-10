import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {HiOutlineSearch} from "react-icons/hi";


const SearchBox = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const {t} = useTranslation();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/items?search=${query}`);
        }
    };

    return (
        <section className={'col-span-10'}>
            <form onSubmit={handleSearch}
                  className="flex w-full max-w-6xl bg-white border border-gray-300 rounded-md shadow-sm overflow-hidden"
                  role={"search"}>
                <label id="search-label" htmlFor="search-input" className="sr-only">
                    {t("search_label")}
                </label>
                <input
                    id={"search-input"}
                    type="search"
                    placeholder={t("search_placeholder")}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full px-4 py-2 text-mlGray bg-white outline-none"
                    aria-label={t("search_placeholder")}
                />
                <button type="submit" className="bg-mlLightGray px-4 flex items-center justify-center" aria-hidden="true" title='Buscar' aria-label={t("search_button")}><HiOutlineSearch
                    className="text-mlDark"/></button>
            </form>
        </section>
    );
};

export default SearchBox;