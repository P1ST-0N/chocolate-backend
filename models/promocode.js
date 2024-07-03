import { Schema, model } from "mongoose";
import Joi from "joi";
import { commetRegax } from "../helper/constant.js";

const promocodeSchema = new Schema({
  promocode: {
    type: String,
    match: commetRegax,
  },
  percent: {
    type: Number,
  },
});

export const promocodeJoiSchema = Joi.object({
  promocode: Joi.string(),
  percent: Joi.number(),
});

export const Promocode = model("promocode", promocodeSchema);
