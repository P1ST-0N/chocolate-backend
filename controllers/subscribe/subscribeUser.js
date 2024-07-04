import { Subscribe } from "../../models/subscribe.js";
import { sendEmail } from "../../helper/sendEmail.js";
import renderTemplate from "../../helper/renderTemplate.js";
import HttpError from "../../helper/HttpError.js";
import getRandomPromoCode from "../promocodes/getRandomPromoCode.js";

const subscribeUser = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await Subscribe.findOne({ email });

    if (user) {
      throw HttpError(409, "Email already in use");
    }

    const result = await Subscribe.create(req.body);

    const promoCode = await getRandomPromoCode();

    const emailData = {
      to: result.email,
      subject: "Subscription confirmation",
      text:
        "Thanks for subscribing to Chocolate market! For this, we give you a promo code for a 10% discount: " +
        promoCode,
      html: await renderTemplate("emailTemplateSubscribe", { promoCode }),
    };

    await sendEmail(emailData);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export default subscribeUser;
