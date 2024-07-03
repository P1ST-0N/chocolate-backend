import { Order } from "../../models/order.js";
import sendEmail from "../../helper/sendEmail.js";
import renderTemplate from "../../helper/renderTemplate.js";

const postOrders = async (req, res, next) => {
  try {
    const orderData = req.body;
    const result = await Order.create(orderData);

    const emailData = {
      to: result.userContact.email,
      subject: "Order confirmation",
      text: `Dear ${result.userContact.firstName},\nWe have received your order. Our manager will contact you soon.\nTotal Price: ${result.totalPrice} UAN`,
      html: await renderTemplate("orderConfirmationTemplate", result),
    };

    await sendEmail(emailData);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export default postOrders;
