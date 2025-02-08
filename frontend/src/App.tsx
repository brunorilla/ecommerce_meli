import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchBox from "./components/SearchBox";
import SearchResults from "./components/SearchResults.tsx";
import ProductDetail from "./components/ProductDetail";

function App() {
    return (
        <Router>
            <SearchBox />
            <Routes>
                <Route path="/" element={<p>Buscá un producto</p>} />
                <Route path="/items" element={<SearchResults />} />
                <Route path="/items/:id" element={<ProductDetail />} />
            </Routes>
        </Router>
    );
}

export default App;