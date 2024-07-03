import { Schema, model } from "mongoose";
import Joi from "joi";
import { formatRegex } from "../helper/constant.js";
import mongooseError from "../helper/mongooseError.js";

const subscribeSchema = new Schema(
  {
    email: {
      type: String,
      match: [formatRegex, "Invalid email format"],
      required: true,
    },
  },
  { versionKey: false }
);

subscribeSchema.post("save", mongooseError);

export const createSubscribeSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Invalid email format",
  }),
});

export const Subscribe = model("subscriber", subscribeSchema);
