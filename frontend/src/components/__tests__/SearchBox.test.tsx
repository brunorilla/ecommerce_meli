import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SearchBox from "../SearchBox";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe("SearchBox Component", () => {
    it("renders the search input", () => {
        render(
            <MemoryRouter>
                <SearchBox />
            </MemoryRouter>
        );

        const searchInput = screen.getByRole("searchbox");
        expect(searchInput).toBeInTheDocument();
        expect(searchInput).toHaveAttribute("type", "search");
    });

    it("updates input value when typing", () => {
        render(
            <MemoryRouter>
                <SearchBox />
            </MemoryRouter>
        );

        const searchInput = screen.getByRole("searchbox");

        fireEvent.change(searchInput, { target: { value: "iphone" } });

        expect(searchInput).toHaveValue("iphone");
    });

    it("navigates to search results when submitting the form", () => {
        render(
            <MemoryRouter>
                <SearchBox />
            </MemoryRouter>
        );

        const searchInput = screen.getByRole("searchbox");
        const searchForm = screen.getByRole("search");

        fireEvent.change(searchInput, { target: { value: "laptop" } });
        fireEvent.submit(searchForm);

        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith("/items?search=laptop");
    });

});