import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import productRoutes from "./routes/ProductRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", productRoutes);

app.get("/", (req, res) => {
    res.send("API Mercado Libre Challenge funcionando 🚀");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});