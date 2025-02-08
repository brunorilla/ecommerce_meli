import express from "express";
import { ProductController } from "../controllers/ProductController";

const router = express.Router();

router.get("/items", async (req, res) => {
    await ProductController.search(req, res);
});
router.get("/items/:id", async (req, res) => {
    await ProductController.getDetail(req, res);
});

export default router;