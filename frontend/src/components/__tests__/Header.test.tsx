import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import Header from "../Header";
import { MemoryRouter } from "react-router-dom";
import logoMeli from "../../assets/logo_meli.png";

vi.mock("../SearchBox", () => ({
    default: () => <div data-testid="search-box" />,
}));

vi.mock("../LanguageSelector", () => ({
    default: () => <div data-testid="language-selector" />,
}));

describe("Header Component", () => {
    it("renders Mercado Libre logo", () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        const logo = screen.getByRole("img", { name: /Mercado Libre Logo/i });
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute("src", logoMeli);
        expect(logo).toHaveAttribute("alt", "Mercado Libre Logo");
    });

    it("renders SearchBox and LanguageSelector components", () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        );

        expect(screen.getByTestId("search-box")).toBeInTheDocument();
        expect(screen.getByTestId("language-selector")).toBeInTheDocument();
    });
});