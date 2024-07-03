import { Schema, model } from "mongoose";

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  compound: {
    type: [String],
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
});

export const Product = model("product", productSchema);
