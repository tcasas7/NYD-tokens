const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createOrderService = async ({ userId,items }) => {

  if (!items || items.length === 0) {
    throw new Error("The order must contain at least one product.");
  }

  const productIds = items.map(item => item.productId);
  const products = await prisma.tokenProduct.findMany({
    where: { id: { in: productIds } },
    select: { id: true, price: true }
  });

 
  const total = items.reduce((sum, item) => {
    const dbProduct = products.find(p => p.id === item.productId);
    if (!dbProduct) throw new Error(`Producto ID ${item.productId} does not exist.`);
    return sum + dbProduct.price * item.quantity;
  }, 0);

 
  const order = await prisma.order.create({
    data: {
      userId,
      total,
      items: {
        create: items.map(({ productId, quantity }) => ({
          productId,
          quantity,
        })),
      },
    },
  });

  return order;
};


const getOrdersByUserService = async (userId) => {
  return await prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });
};

const getAllOrdersService = async () => {
  return await prisma.order.findMany({
    include: {
      user: true,
      items: {
        include: { product: true },
      },
    },
  });
};

const updateOrderStatusService = async (id, status) => {
  return await prisma.order.update({
    where: { id: parseInt(id) },
    data: { status },
  });
};

module.exports = {
  createOrderService,
  getOrdersByUserService,
  getAllOrdersService,
  updateOrderStatusService,
};