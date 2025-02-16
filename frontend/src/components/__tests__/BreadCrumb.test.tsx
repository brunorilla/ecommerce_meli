import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, useNavigate } from "react-router-dom";
import Breadcrumb from "../Breadcrumb";
import { ProductCategory } from "../../adapters/productAdapter";

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

describe("Breadcrumb Component", () => {
    const mockNavigate = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        //@ts-expect-error: to do fix
        (useNavigate as vi.Mock).mockReturnValue(mockNavigate);
    });

    it("renders correctly with categories", () => {
        const categories: ProductCategory[] = [
            { id: "1", name: "Electronics" },
            { id: "2", name: "Phones" },
        ];

        render(
            <MemoryRouter>
                <Breadcrumb categories={categories} />
            </MemoryRouter>
        );

        expect(screen.getByText("Electronics")).toBeInTheDocument();
        expect(screen.getByText("Phones")).toBeInTheDocument();
    });

    it("navigates to the correct category when clicked", () => {
        const categories: ProductCategory[] = [
            { id: "1", name: "Electronics" },
            { id: "2", name: "Phones" },
        ];

        render(
            <MemoryRouter>
                <Breadcrumb categories={categories} />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText("Electronics"));

        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith("/items?category=1");
    });

    it("does not navigate when clicking an unknown category", () => {
        const categories: ProductCategory[] = [
            { id: "unknown", name: "Unknown Category" },
        ];

        render(
            <MemoryRouter>
                <Breadcrumb categories={categories} />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText("Unknown Category"));

        expect(mockNavigate).not.toHaveBeenCalled();
    });

    it("renders nothing when there are no categories", () => {
        const { container } = render(
            <MemoryRouter>
                <Breadcrumb categories={[]} />
            </MemoryRouter>
        );

        expect(container.firstChild).toBeNull();
    });
});