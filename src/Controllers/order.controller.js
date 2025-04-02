const {
    createOrderService,
    getOrdersByUserService,
    getAllOrdersService,
    updateOrderStatusService,
    } = require("../Services/order.service.final");

  
  const createOrder = async (req, res) => {
    try {
      const { items } = req.body;
      const userId = req.user.id;
      const order = await createOrderService({ userId, items });
      res.status(201).json(order);
    } catch (err) {
      console.error("❌ createOrder error:", err);
      res.status(400).json({ error: err.message || "Error creating order." });
    }
  };
  
  const getOrdersByUser = async (req, res) => {
    try {
      const orders = await getOrdersByUserService(parseInt(req.params.id));
      res.json(orders);
    } catch (err) {
      console.error("❌ getOrdersByUser error:", err);
      res.status(500).json({ error: "Error fetching user's orders." });
    }
  };
  
  const getAllOrders = async (req, res) => {
    try {
      const orders = await getAllOrdersService();
      res.json(orders);
    } catch (err) {
      console.error("❌ getAllOrders error:", err);
      res.status(500).json({ error: "Error fetching all orders."});
    }
  };
  
  const updateOrderStatus = async (req, res) => {
    try {
      const updated = await updateOrderStatusService(req.params.id, req.body.status);
      res.json(updated);
    } catch (err) {
      console.error("❌ updateOrderStatus error:", err);
      res.status(500).json({ error: "Error updating order status." });
    }
  };
  
  module.exports = {
    createOrder,
    getOrdersByUser,
    getAllOrders,
    updateOrderStatus,
  };