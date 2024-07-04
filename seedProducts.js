import mongoose from "mongoose";
import { Product } from "./models/product.js";

const { DB_HOST, PORT } = process.env;

mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const products = [
  {
    productName: "Classic Chocolate Bar",
    category: "bar",
    price: "2.99",
    description: "A classic milk chocolate bar.",
    compound: ["milk chocolate", "sugar", "cocoa butter", "vanilla"],
    photo: "https://example.com/photos/classic-chocolate-bar.jpg",
  },
  {
    productName: "Assorted Chocolate Candies",
    category: "candy",
    price: "5.99",
    description: "A mix of milk, dark, and white chocolate candies.",
    compound: [
      "milk chocolate",
      "dark chocolate",
      "white chocolate",
      "sugar",
      "cocoa butter",
      "vanilla",
    ],
    photo: "https://example.com/photos/assorted-chocolate-candies.jpg",
  },
  {
    productName: "Premium Dark Chocolate Block",
    category: "block",
    price: "9.99",
    description: "A large block of premium dark chocolate.",
    compound: ["dark chocolate", "cocoa butter", "sugar", "vanilla"],
    photo: "https://example.com/photos/premium-dark-chocolate-block.jpg",
  },
];

Product.insertMany(products)
  .then(() => {
    console.log("Products inserted successfully");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error inserting products:", error);
    mongoose.connection.close();
  });
