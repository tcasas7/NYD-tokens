const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUsersService = async () => {
    return await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        fullName: true, 
        phone: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });
  };
  
  const updateUserStatusService = async (id, status) => {
    return await prisma.user.update({
      where: { id },
      data: { status },
    });
  };
  

  module.exports = { getAllUsersService, updateUserStatusService };