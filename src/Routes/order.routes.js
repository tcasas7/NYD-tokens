const express = require("express");
const authenticate = require("../middlewares/auth");
const router = express.Router();

const {
  createOrder,
  getOrdersByUser,
  getAllOrders,
  updateOrderStatus,
} = require("../Controllers/order.controller");

router.post("/", authenticate, createOrder);

router.post("/", createOrder);
router.get("/user/:id", getOrdersByUser);
router.get("/", getAllOrders);
router.put("/:id/status", updateOrderStatus);

module.exports = router;
