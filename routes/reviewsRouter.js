import express from "express";
import getAllReviews from "../controllers/reviews/getAllReviews.js";
import postReview from "../controllers/reviews/postReview.js";
import validateBody from "../helper/validateBody.js";
import { createReviewSchema } from "../models/review.js";

const reviewsRouter = express.Router();

reviewsRouter.get("/", getAllReviews);
reviewsRouter.post("/", validateBody(createReviewSchema), postReview);

export default reviewsRouter;
