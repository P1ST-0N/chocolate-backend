import { Review } from "../../models/review.js";

const getAllReviews = async (req, res, next) => {
  try {
    const result = await Review.find();

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default getAllReviews;
