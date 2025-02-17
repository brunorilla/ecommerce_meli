import { Request, Response } from "express";
import { ProductController } from "./ProductController";
import { ProductService } from "../infrastructure/ProductService";

describe("ProductController", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("search", () => {
        it("debería retornar 400 si no se provee ni 'q' ni 'category'", async () => {
            const req = { query: {} } as Partial<Request>;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as Partial<Response>;

            await ProductController.search(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                error: "Either 'q' or 'category' parameter is required",
            });
        });

        it("debería llamar a ProductService.searchProducts y retornar el resultado cuando se provee 'q'", async () => {
            const req = { query: { q: "iphone" } } as Partial<Request>;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as Partial<Response>;

            const mockResult = {
                author: { name: "Bruno", lastname: "Rilla Santiago" },
                categories: [{ id: "cat1", name: "Phones" }],
                items: [
                    {
                        id: "1",
                        title: "iPhone",
                        price: { currency: "USD", amount: 1000, decimals: 0 },
                        picture: "url",
                        condition: "new",
                        free_shipping: true,
                        location: "burzaco, Buenos Aires"

                    },
                ],
            };

            const searchProductsSpy = jest
                .spyOn(ProductService, "searchProducts")
                .mockResolvedValue(mockResult);

            await ProductController.search(req as Request, res as Response);

            expect(searchProductsSpy).toHaveBeenCalledWith("iphone", undefined);
            expect(res.json).toHaveBeenCalledWith(mockResult);
        });

        it("debería llamar a ProductService.searchProducts y retornar el resultado cuando se provee 'category'", async () => {
            const req = { query: { category: "electronics" } } as Partial<Request>;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as Partial<Response>;

            const mockResult = {
                author: { name: "Bruno", lastname: "Rilla Santiago" },
                categories: [{ id: "cat2", name: "Electronics" }],
                items: [
                    {
                        id: "2",
                        title: "TV",
                        price: { currency: "USD", amount: 2000, decimals: 0 },
                        picture: "url",
                        condition: "new",
                        free_shipping: false,
                        location: "burzaco, Buenos Aires"

                    },
                ],
            };

            const searchProductsSpy = jest
                .spyOn(ProductService, "searchProducts")
                .mockResolvedValue(mockResult);

            await ProductController.search(req as Request, res as Response);

            expect(searchProductsSpy).toHaveBeenCalledWith(undefined, "electronics");
            expect(res.json).toHaveBeenCalledWith(mockResult);
        });

        it("debería retornar 500 y mensaje de error cuando ocurre un error en searchProducts", async () => {
            const req = { query: { q: "error" } } as Partial<Request>;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as Partial<Response>;

            jest
                .spyOn(ProductService, "searchProducts")
                .mockRejectedValue(new Error("Test error"));

            await ProductController.search(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
        });
    });

    describe("getDetail", () => {
        it("debería retornar 400 si no se provee el ID del producto", async () => {
            const req = { params: {} } as Partial<Request>;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as Partial<Response>;

            await ProductController.getDetail(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "Product ID is required" });
        });

        it("debería llamar a ProductService.getProductDetail y retornar el resultado cuando se provee un ID", async () => {
            const req = { params: { id: "123" } } as Partial<Request>;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as Partial<Response>;

            const mockResult = {
                author: { name: "Bruno", lastname: "Rilla Santiago" },
                item: {
                    id: "123",
                    title: "Producto Test",
                    price: { currency: "USD", amount: 100, decimals: 0 },
                    picture: "url",
                    condition: "new",
                    free_shipping: true,
                    sold_quantity: 5,
                    description: "Some description",
                    categories: [{ id: "cat1", name: "Test Category" }],
                    location: "burzaco, Buenos Aires"
                },
            };

            const getProductDetailSpy = jest
                .spyOn(ProductService, "getProductDetail")
                .mockResolvedValue(mockResult);

            await ProductController.getDetail(req as Request, res as Response);

            expect(getProductDetailSpy).toHaveBeenCalledWith("123");
            expect(res.json).toHaveBeenCalledWith(mockResult);
        });

        it("debería retornar 500 y mensaje de error cuando ocurre un error en getProductDetail", async () => {
            const req = { params: { id: "123" } } as Partial<Request>;
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as Partial<Response>;

            jest
                .spyOn(ProductService, "getProductDetail")
                .mockRejectedValue(new Error("Test error"));

            await ProductController.getDetail(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
        });
    });
});