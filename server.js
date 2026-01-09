import express from "express";
import cors from "cors";
import "./database.js";
import productsRoutes from "./products.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(productsRoutes);

app.listen(PORT, () => {
  console.log("🚀 Backend corriendo");
});
