import axios from "axios";
import { ProductService } from "../ProductService";
import { SearchResult, ProductDetailResult } from "../../domain/Product";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("ProductService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("searchProducts", () => {
        it("debe retornar el SearchResult con las categorías mapeadas y los items procesados", async () => {
            const fakeResponse = {
                data: {
                    filters: [
                        {
                            id: "category",
                            values: [
                                {
                                    path_from_root: [
                                        { id: "cat1", name: "Phones" },
                                        { id: "cat2", name: "Smartphones" },
                                    ],
                                },
                            ],
                        },
                    ],
                    results: [
                        {
                            id: "1",
                            title: "iPhone 12",
                            price: 1000.45,
                            currency_id: "USD",
                            thumbnail: "http://example.com/iphone12.jpg",
                            condition: "new",
                            shipping: { free_shipping: true },
                        },
                        {
                            id: "2",
                            title: "iPhone 13",
                            price: 1200.99,
                            currency_id: "USD",
                            thumbnail: "http://example.com/iphone13.jpg",
                            condition: "new",
                            shipping: { free_shipping: false },
                        },
                    ],
                },
            };

            mockedAxios.get.mockResolvedValueOnce(fakeResponse);

            const result = await ProductService.searchProducts("iphone");

            expect(mockedAxios.get).toHaveBeenCalledWith(
                "https://api.mercadolibre.com/sites/MLA/search?q=iphone"
            );

            expect(result).toEqual({
                author: { name: "Bruno", lastname: "Rilla Santiago" },
                categories: [
                    { id: "cat1", name: "Phones" },
                    { id: "cat2", name: "Smartphones" },
                ],
                items: [
                    {
                        id: "1",
                        title: "iPhone 12",
                        price: {
                            currency: "USD",
                            amount: Math.floor(1000.45),
                            decimals:
                                parseInt((1000.45 % 1).toFixed(2).substring(2)) || 0,
                        },
                        picture: "http://example.com/iphone12.jpg",
                        condition: "new",
                        free_shipping: true,
                    },
                    {
                        id: "2",
                        title: "iPhone 13",
                        price: {
                            currency: "USD",
                            amount: Math.floor(1200.99),
                            decimals:
                                parseInt((1200.99 % 1).toFixed(2).substring(2)) || 0,
                        },
                        picture: "http://example.com/iphone13.jpg",
                        condition: "new",
                        free_shipping: false,
                    },
                ],
            } as SearchResult);
        });

        it("debe retornar la categoría por defecto cuando no se encuentran filtros", async () => {
            const fakeResponse = {
                data: {
                    filters: [],
                    results: [
                        {
                            id: "1",
                            title: "iPhone 12",
                            price: 1000.45,
                            currency_id: "USD",
                            thumbnail: "http://example.com/iphone12.jpg",
                            condition: "new",
                            shipping: { free_shipping: true },
                        },
                    ],
                },
            };

            mockedAxios.get.mockResolvedValueOnce(fakeResponse);

            const result = await ProductService.searchProducts("iphone");

            expect(result.categories).toEqual([
                { id: "unknown", name: "Categoría indeterminada" },
            ]);
        });
    });

    describe("getProductDetail", () => {
        it("debe retornar el ProductDetailResult con item y categorías", async () => {
            const id = "123";

            const itemData = {
                id: "123",
                title: "Producto 123",
                price: 200.99,
                currency_id: "USD",
                thumbnail: "http://example.com/product123.jpg",
                condition: "used",
                shipping: { free_shipping: false },
                sold_quantity: 10,
                category_id: "cat123",
            };

            const descriptionData = {
                plain_text: "Este es un producto de prueba",
            };

            const categoryData = {
                path_from_root: [
                    { id: "cat1", name: "Electronics" },
                    { id: "cat2", name: "Gadgets" },
                ],
            };

            mockedAxios.get
                .mockResolvedValueOnce({ data: itemData })
                .mockResolvedValueOnce({ data: descriptionData })
                .mockResolvedValueOnce({ data: categoryData });

            const result = await ProductService.getProductDetail(id);

            const expectedResult: ProductDetailResult = {
                author: { name: "Bruno", lastname: "Rilla Santiago" },
                item: {
                    id: "123",
                    title: "Producto 123",
                    price: {
                        currency: "USD",
                        amount: Math.floor(itemData.price),
                        decimals:
                            parseInt((itemData.price % 1).toFixed(2).substring(2)) || 0,
                    },
                    picture: "http://example.com/product123.jpg",
                    condition: "used",
                    free_shipping: false,
                    sold_quantity: 10,
                    description: "Este es un producto de prueba",
                    categories: categoryData.path_from_root,
                },
            };

            expect(result).toEqual(expectedResult);

            expect(mockedAxios.get).toHaveBeenNthCalledWith(
                1,
                `https://api.mercadolibre.com/items/${id}`
            );
            expect(mockedAxios.get).toHaveBeenNthCalledWith(
                2,
                `https://api.mercadolibre.com/items/${id}/description`
            );
            expect(mockedAxios.get).toHaveBeenNthCalledWith(
                3,
                `https://api.mercadolibre.com/categories/${itemData.category_id}`
            );
        });
    });
});