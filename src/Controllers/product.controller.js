const { getAllProductsService, createProductService, updateProductService, deleteProductService } = require("../services/product.service");

const getAllProducts = async (req, res) => {
  try {
    const products = await getAllProductsService();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener productos." });
  }
};

const createProduct = async (req, res) => {
  try {
    const { title, price, imageUrl, description, categoryId } = req.body;
    const newProduct = await createProductService({ title, price, imageUrl, description, categoryId });
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("❌ createProduct error:", err);
    res.status(500).json({ error: "Error al crear producto." });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updated = await updateProductService(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    console.error("❌ updateProduct error:", err);
    res.status(500).json({ error: "Error al actualizar producto." });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await deleteProductService(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error("❌ deleteProduct error:", err);
    res.status(500).json({ error: "Error al eliminar producto." });
  }
};

module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct };