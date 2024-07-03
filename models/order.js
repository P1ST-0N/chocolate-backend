import { Schema, model } from "mongoose";
import Joi from "joi";
import { commetRegax, formatRegex, valueNumber } from "../helper/constant.js";
import mongooseError from "../helper/mongooseError.js";

const orderItemSchema = new Schema(
  {
    nameProduct: { type: String, required: true },
    photo: { type: String, required: true },
    quantity: { type: Number, required: true },
    total: { type: String, required: true },
  },
  { _id: false }
);

const orderUserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: {
      type: String,
      match: [valueNumber, "Invalid phone number format. Use XX-XXX-XXXX"],
      required: true,
    },
    email: {
      type: String,
      match: [formatRegex, "Invalid email format"],
      required: true,
    },
    selectRegion: { type: String, default: "" },
    selectCity: { type: String, default: "" },
    comment: {
      type: String,
      match: [
        commetRegax,
        'A comment can only contain Latin characters, numbers, and symbols .,!?/-"():;',
      ],
      maxLength: 300,
      default: "",
    },
  },
  { _id: false }
);

const orderSchema = new Schema(
  {
    userContact: {
      type: orderUserSchema,
      required: true,
    },
    order: {
      type: [orderItemSchema],
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Order accepted",
    },
  },
  { versionKey: false }
);

orderSchema.post("save", mongooseError);

export const Order = model("order", orderSchema);

const joiOrderItemSchema = Joi.object({
  nameProduct: Joi.string().required(),
  photo: Joi.string().required(),
  quantity: Joi.number().required(),
  total: Joi.string().required(),
});

export const createOrderSchema = Joi.object({
  userContact: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().required(),
    selectRegion: Joi.string().empty(""),
    selectCity: Joi.string().empty(""),
    comment: Joi.string().empty("").max(300).pattern(commetRegax),
  }).required(),
  order: Joi.array().items(joiOrderItemSchema).required(),
  totalPrice: Joi.number().required(),
  discount: Joi.number().required(),
});
