import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SearchResultsPage from "../SearchResultsPage";
import { MemoryRouter } from "react-router-dom";
import { useSearchProducts } from "../../hooks/useSearchProducts";

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        MemoryRouter: actual.MemoryRouter,
    };
});

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

vi.mock("../../hooks/useSearchProducts", () => ({
    useSearchProducts: vi.fn(),
}));

describe("SearchResultsPage Component", () => {
    it("shows loading screen when loading", () => {
    //@ts-expect-error: to do fix
        (useSearchProducts as vi.Mock).mockReturnValue({
            loading: true,
            searchResults: [],
            error: null,
            categories: [],
        });

        render(
            <MemoryRouter>
                <SearchResultsPage />
            </MemoryRouter>
        );

        expect(screen.getByText("loading")).toBeInTheDocument();
    });

    it("shows error message when API call fails", () => {
        //@ts-expect-error: to do fix
        (useSearchProducts as vi.Mock).mockReturnValue({
            loading: false,
            searchResults: [],
            error: "API error",
            categories: [],
        });

        render(
            <MemoryRouter>
                <SearchResultsPage />
            </MemoryRouter>
        );

        expect(screen.getByText("error_api_message")).toBeInTheDocument();
    });

    it("shows no results message when no products are found", () => {
        //@ts-expect-error: to do fix
        (useSearchProducts as vi.Mock).mockReturnValue({
            loading: false,
            searchResults: [],
            error: null,
            categories: [],
        });

        render(
            <MemoryRouter>
                <SearchResultsPage />
            </MemoryRouter>
        );

        expect(screen.getByText("no_products_found")).toBeInTheDocument();
    });

    it("renders Breadcrumb and SearchResultsList when data is available", () => {
        //@ts-expect-error: to do fix
        (useSearchProducts as vi.Mock).mockReturnValue({
            loading: false,
            searchResults: [{ id: "1", title: "iPhone", price: "$1000", imageUrl: "", condition: "new", freeShipping: true }],
            error: null,
            categories: [{ id: "cat1", name: "Phones" }],
        });

        render(
            <MemoryRouter>
                <SearchResultsPage />
            </MemoryRouter>
        );

        expect(screen.getByText("iPhone")).toBeInTheDocument();
        expect(screen.getByText("Phones")).toBeInTheDocument();
    });
});