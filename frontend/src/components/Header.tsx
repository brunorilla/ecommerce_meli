import SearchBox from "./SearchBox";
import LanguageSelector from "./LanguageSelector.tsx";
import logoMeli from "../assets/logo_meli.png";

const Header = () => {
    return (
        <header className="bg-mlYellow p-3">
            <div className="container mx-auto grid grid-cols-12 items-center gap-4">
                <div className="col-span-1 flex justify-center">
                    <img src={logoMeli} alt="Mercado Libre Logo" className="w-[60%] h-auto mx-auto"/>
                </div>
                <SearchBox/>
                <LanguageSelector/>
            </div>
        </header>
    );
};

export default Header;