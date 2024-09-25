import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cors from "cors";
import authRoutes from './routes/auth.route.js';
import blogRoutes from './routes/blog.route.js';
import portfolioRoutes from "./routes/portfolio.routes.js";


dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(cors());

app.use("api/auth", authRoutes);


app.use("/api/portfolio", portfolioRoutes);


app.use("/api/blog", blogRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});









