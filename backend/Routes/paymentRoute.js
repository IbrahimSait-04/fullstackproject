const razorPayController = require("../Controllers/razorpayController")
const router = require("express").Router()


router.post("/createOrder" ,razorPayController.createOrder)
router.post("/verify", razorPayController.verifyPayment);

module.exports = router;