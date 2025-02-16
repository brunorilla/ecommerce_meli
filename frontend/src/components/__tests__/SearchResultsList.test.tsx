import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SearchResultsList from "../SearchResultsList";
import { Product } from "../../adapters/productAdapter";
import { MemoryRouter } from "react-router-dom";

const mockProducts: Product[] = [
    {
        id: "1",
        title: "iPhone 13",
        price: "999",
        imageUrl: "https://example.com/iphone13.jpg",
        condition: "new",
        freeShipping: true,
    },
    {
        id: "2",
        title: "Samsung Galaxy S21",
        price: "899",
        imageUrl: "https://example.com/s21.jpg",
        condition: "new",
        freeShipping: false,
    },
];

describe("SearchResultsList Component", () => {
    it("renders correctly with products", () => {
        render(
            <MemoryRouter>
                <SearchResultsList results={mockProducts} />
            </MemoryRouter>
        );

        expect(screen.getByText("iPhone 13")).toBeInTheDocument();
        expect(screen.getByText("Samsung Galaxy S21")).toBeInTheDocument();
    });

    it("renders the correct number of items", () => {
        render(
            <MemoryRouter>
                <SearchResultsList results={mockProducts} />
            </MemoryRouter>
        );

        const items = screen.getAllByRole("listitem");
        expect(items).toHaveLength(mockProducts.length);
    });

    it("renders an empty list without crashing", () => {
        const { container } = render(
            <MemoryRouter>
                <SearchResultsList results={[]} />
            </MemoryRouter>
        );

        expect(container.querySelector("ul")).toBeEmptyDOMElement();
    });
});