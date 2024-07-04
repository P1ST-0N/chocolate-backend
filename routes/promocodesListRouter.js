import express from "express";
import getRandomPromoCode from "../controllers/promocodes/getRandomPromoCode.js";
import checkPromocode from "../controllers/promocodes/checkPromocode.js";

const promocodesListRouter = express.Router();

promocodesListRouter.get("/", getRandomPromoCode);
promocodesListRouter.post("/check", checkPromocode);

export default promocodesListRouter;
