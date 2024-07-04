import { Promocode } from "../../models/promocode.js";

const checkPromocode = async (req, res, next) => {
  try {
    const { promocode } = req.body;

    const foundPromocode = await Promocode.findOne({ promocode });

    if (!foundPromocode) {
      return res.status(404).json({ message: "No promocode found" });
    }

    res.status(200).json({ percent: foundPromocode.percent });
  } catch (error) {
    next(error);
  }
};

export default checkPromocode;
