const { getAllProductsService, createProductService, updateProductService, deleteProductService } = require("../services/product.service");

const getAllProducts = async (req, res) => {
  try {
    const products = await getAllProductsService();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching products." });
  }
};

const createProduct = async (req, res) => {
  try {
    const { title, price, imageUrl, description, categoryId } = req.body;
    const newProduct = await createProductService({ title, price, imageUrl, description, categoryId });
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("❌ createProduct error:", err);
    res.status(500).json({ error: "Error creating product."});
  }
};

const updateProduct = async (req, res) => {
  try {
    const updated = await updateProductService(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    console.error("❌ updateProduct error:", err);
    res.status(500).json({ error: "Error updating product."});
  }
};

const deleteProduct = async (req, res) => {
  try {
    await deleteProductService(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error("❌ deleteProduct error:", err);
    res.status(500).json({ error: "Error deleting product." });
  }
};

module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct };