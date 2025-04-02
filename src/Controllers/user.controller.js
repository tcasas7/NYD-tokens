const { getAllUsersService, updateUserStatusService } = require("../Services/user.service");

const getAllUsers = async (req, res) => {
    try {
      const users = await getAllUsersService();
      res.json(users);
    } catch (err) {
      console.error("❌ getAllUsers error:", err);
      res.status(500).json({ error: "Error fetching users." });
    }
  };

  const updateUserStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    if (!status) return res.status(400).json({ error: "Status is required." });
  
    try {
      const updated = await updateUserStatusService(parseInt(id), status);
      res.json(updated);
    } catch (err) {
      console.error("❌ updateUserStatus error:", err);
      res.status(500).json({ error: "Failed to update status." });
    }
  };
  
  
  module.exports = { getAllUsers, updateUserStatus };