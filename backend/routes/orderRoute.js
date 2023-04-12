const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();

const { verifyToken, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(verifyToken, newOrder);

router
  .route("/order/:id")
  .get(verifyToken, authorizeRoles("admin"), getSingleOrder);

router.route("/orders/me").get(verifyToken, myOrders);

router
  .route("/admin/orders")
  .get(verifyToken, authorizeRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(verifyToken, authorizeRoles("admin"), updateOrder)
  .delete(verifyToken, authorizeRoles("admin"), deleteOrder);

module.exports = router;
