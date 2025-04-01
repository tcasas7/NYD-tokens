const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllTokensService = async () => {
  return await prisma.tokenCategory.findMany();
};

const getProductsByCategoryService = async (categoryId) => {
  return await prisma.tokenProduct.findMany({
    where: { categoryId },
    include: { category: true }, 
  });
};

module.exports = { getAllTokensService, getProductsByCategoryService };