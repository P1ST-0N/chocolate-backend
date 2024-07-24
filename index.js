import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import swaggerDocument from "./swagger.js";
import swaggerUi from "swagger-ui-express";

import productsRouter from "./routes/productsRouter.js";
import reviewsRouter from "./routes/reviewsRouter.js";
import subscribeRouter from "./routes/subscribeRouter.js";
import orderRouter from "./routes/orderRouter.js";
import promocodesListRouter from "./routes/promocodesListRouter.js";

const app = express();
const { DB_HOST, PORT } = process.env;

app.use(morgan("tiny"));

const allowedOrigins = [
  "https://project-chocolate-market.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/products", productsRouter);
app.use("/reviews", reviewsRouter);
app.use("/subscribe", subscribeRouter);
app.use("/promocodes", promocodesListRouter);
app.use("/order", orderRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
