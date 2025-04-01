const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../Controllers/user.controller");

router.get("/", getAllUsers);


module.exports = router;
