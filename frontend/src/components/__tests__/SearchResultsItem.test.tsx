import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SearchResultItem from "../SearchResultsItem";
import { Product } from "../../adapters/productAdapter";
import { MemoryRouter } from "react-router-dom";

const mockProduct: Product = {
    id: "1",
    title: "iPhone 13",
    price: "999",
    imageUrl: "https://example.com/iphone13.jpg",
    condition: "new",
    freeShipping: true,
};

describe("SearchResultItem Component", () => {
    it("renders correctly with product details", () => {
        render(
            <MemoryRouter>
                <SearchResultItem product={mockProduct} />
            </MemoryRouter>
        );

        expect(screen.getByText("iPhone 13")).toBeInTheDocument();
        expect(screen.getByText("$999")).toBeInTheDocument();
    });

    it("renders product image with correct attributes", () => {
        render(
            <MemoryRouter>
                <SearchResultItem product={mockProduct} />
            </MemoryRouter>
        );

        const img = screen.getByRole("img", { name: "iPhone 13" });
        expect(img).toHaveAttribute("src", "https://example.com/iphone13.jpg");
        expect(img).toHaveAttribute("alt", "iPhone 13");
        expect(img).toHaveAttribute("loading", "lazy");
        expect(img).toHaveAttribute("width", "180");
        expect(img).toHaveAttribute("height", "180");
    });

    it("includes a working link to product details", () => {
        render(
            <MemoryRouter>
                <SearchResultItem product={mockProduct} />
            </MemoryRouter>
        );

        const link = screen.getByRole("link", { name: "Ver detalles de iPhone 13" });
        expect(link).toHaveAttribute("href", "/items/1");
    });
});