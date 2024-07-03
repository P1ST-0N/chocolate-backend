import { Schema, model } from "mongoose";
import Joi from "joi";
import { formatRegex, valueNumber } from "../helper/constant.js";
import mongooseError from "../helper/mongooseError.js";

const reviewSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for review"],
    },
    email: {
      type: String,
      match: [formatRegex, "Invalid email format"],
      required: true,
    },
    phone: {
      type: String,
      match: [valueNumber, "Invalid phone number format. Use XX-XXX-XXXX"],
      default: "",
    },
    comment: {
      type: String,
      required: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
    photo: {
      type: String,
      default:
        "https://res.cloudinary.com/dntbkzhtq/image/upload/v1717414356/picture_el05gj.webp",
    },
  },
  { versionKey: false }
);

reviewSchema.post("save", mongooseError);

export const createReviewSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().empty(""),
  comment: Joi.string().required(),
  published: Joi.boolean(),
  photo: Joi.string(),
});

export const Review = model("review", reviewSchema);
