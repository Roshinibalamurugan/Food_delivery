import express from "express";
import cors from "cors";
import connectDB from "./db/db.js";
import foodRoutes from "./routes/foodRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";


connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);


app.listen(5000, () => console.log('Server running '));
