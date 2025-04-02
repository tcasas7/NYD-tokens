const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const findUserByEmailService = async (email) => {
  return await prisma.user.findUnique({ where: { email } });
};

const createUserService = async ({ email, password, fullName, phone }) => {
  return await prisma.user.create({
    data: {
      email,
      password,
      fullName,
      phone,
      role: "USER",
      status: "PENDING"
    },
  });
};

module.exports = {
  findUserByEmailService,
  createUserService
};
