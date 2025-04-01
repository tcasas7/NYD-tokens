const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUsersService = async () => {
    return await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });
  };
  
  module.exports = { getAllUsersService };