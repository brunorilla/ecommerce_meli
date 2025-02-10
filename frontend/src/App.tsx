import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchResultsPage from "./pages/SearchResultsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Header from "./components/Header.tsx";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/items" element={<SearchResultsPage />} />
                <Route path="/items/:id" element={<ProductDetailPage />} />
            </Routes>
        </Router>
    );
}

export default App;