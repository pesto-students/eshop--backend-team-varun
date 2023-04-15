const express = require("express");
const { processPayment, sendStripeApiKey,} = require("../controllers/paymentController");
 const { verifyToken} = require("../middleware/auth");

 const router = express.Router();

 router.route("/payment/process").post(verifyToken, processPayment);

 router.route("/stripeapikey").get(verifyToken, sendStripeApiKey);

 module.exports = router;