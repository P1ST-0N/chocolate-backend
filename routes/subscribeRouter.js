import express from "express";
import validateBody from "../helper/validateBody.js";
import { createSubscribeSchema } from "../models/subscribe.js";
import subscribeUser from "../controllers/subscribe/subscribeUser.js";

const subscribeRouter = express.Router();

subscribeRouter.post("/", validateBody(createSubscribeSchema), subscribeUser);

export default subscribeRouter;
