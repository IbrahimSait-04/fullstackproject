const razorpay = require("../config/razorPay");
const crypto = require("crypto")


const createOrder = async (req, res) => {
  try {
    console.log("Body:", req.body);

    const { amount } = req.body;

    console.log("Amount:", amount);
    

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    console.log("Options:", options);

    const order = await razorpay.orders.create(options);

    console.log("Order Created:", order);

    res.json(order);

  } catch (error) {
    console.log("================================");
    console.log(error);
    console.log("================================");

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      return res.status(200).json({
        success: true,
        message: "Payment Verified",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Payment Verification Failed",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
};