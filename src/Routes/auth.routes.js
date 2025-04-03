const express = require("express");
const router = express.Router();
const {register, login} = require("../Controllers/auth.Controller");
const authenticate = require("../middlewares/auth");


router.post("/register", register);
router.post("/login", login);

router.get("/profile", authenticate, (req, res) => {
  const { id, role } = req.user;
  res.json({ id, role });
});
module.exports = router;
