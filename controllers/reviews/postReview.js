import { Review } from "../../models/review.js";

const postReview = async (req, res, next) => {
  try {
    const result = await Review.create(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export default postReview;
