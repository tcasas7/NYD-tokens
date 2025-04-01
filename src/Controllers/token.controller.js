const { getAllTokensService, getProductsByCategoryService } = require("../Services/token.service");

const getAllTokens = async (req, res) => {
  try {
    const tokens = await getAllTokensService();
    res.json(tokens);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los tokens." });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await getProductsByCategoryService(parseInt(id));
    res.json(products);
  } catch (err) {
    console.error("❌ Error en getProductsByCategory:", err);
    res.status(500).json({ error: "Error al obtener productos por categoría." });
  }
};

module.exports = { getAllTokens, getProductsByCategory };