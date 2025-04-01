const { getAllUsersService } = require("../Services/user.service");

const getAllUsers = async (req, res) => {
    try {
      const users = await getAllUsersService();
      res.json(users);
    } catch (err) {
      console.error("❌ getAllUsers error:", err);
      res.status(500).json({ error: "Error al obtener usuarios." });
    }
  };
  
  module.exports = { getAllUsers };