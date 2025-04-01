const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllProductsService = async () => {
  return await prisma.tokenProduct.findMany({
    include: { category: true },
  });
};

const createProductService = async ({ title, price, imageUrl, description, categoryId }) => {
  return await prisma.tokenProduct.create({
    data: { title, price, imageUrl, description, categoryId },
  });
};

const updateProductService = async (id, data) => {
  return await prisma.tokenProduct.update({
    where: { id: parseInt(id) },
    data,
  });
};

const deleteProductService = async (id) => {
  return await prisma.tokenProduct.delete({
    where: { id: parseInt(id) },
  });
};

module.exports = { getAllProductsService, createProductService, updateProductService, deleteProductService };