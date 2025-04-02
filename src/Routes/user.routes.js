const express = require("express");
const router = express.Router();
const { getAllUsers, updateUserStatus } = require("../Controllers/user.controller");

router.get("/", getAllUsers);
router.patch("/:id/status", updateUserStatus);


module.exports = router;
