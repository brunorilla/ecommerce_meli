import { Request, Response } from "express";
import { ProductService } from "../infrastructure/ProductService";

export class ProductController {
    static async search(req: Request, res: Response) {
        try {
            const query = req.query.q as string;
            if (!query) {
                return res.status(400).json({ error: "Query parameter 'q' is required" });
            }

            const result = await ProductService.searchProducts(query);
            console.log(result)
            return res.json(result);
        } catch (error) {
            console.error("Error in search:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    static async getDetail(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: "Product ID is required" });
            }

            const result = await ProductService.getProductDetail(id);
            return res.json(result);
        } catch (error) {
            console.error("Error in getDetail:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}