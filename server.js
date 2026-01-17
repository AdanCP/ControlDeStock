import express from "express";
import cors from "cors";
import "./database.js";
import productsRoutes from "./products.js";
import ordersRoutes from "./orders.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Stock funcionando 🚀");
});

// ==============================
// ROUTES
// ==============================
app.use(productsRoutes);
app.use(ordersRoutes);

// ==============================
// START SERVER
// ==============================
app.listen(PORT, () => {
  console.log("🚀 Backend corriendo en puerto", PORT);
});
