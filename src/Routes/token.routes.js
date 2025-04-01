const express = require("express");
const router = express.Router();
const { getAllTokens, getProductsByCategory  } = require("../Controllers/token.controller");

router.get("/", getAllTokens);
router.get("/:id/products", getProductsByCategory);

module.exports = router;
