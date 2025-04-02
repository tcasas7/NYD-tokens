const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    const existing = await prisma.tokenProduct.findFirst();
    if (existing) {
      console.log("🟡 Products already exist, skipping seed.");
      return;
    }    

  const categories = [
    { name: "VIP" },
    { name: "GOLD" },
    { name: "ESSENTIAL" },
  ];

  // Crear categorías
  for (const cat of categories) {
    await prisma.tokenCategory.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    });
  }

  const vip = await prisma.tokenCategory.findUnique({ where: { name: "VIP" } });
  const gold = await prisma.tokenCategory.findUnique({ where: { name: "GOLD" } });
  const essential = await prisma.tokenCategory.findUnique({ where: { name: "ESSENTIAL" } });

  const products = [
    {
      title: "Meet & Greet",
      price: 1000,
      imageUrl: "https://example.com/vip1.jpg",
      description: "Exclusive meet and greet with players",
      categoryId: vip.id,
    },
    {
      title: "Signed Shirt",
      price: 500,
      imageUrl: "https://example.com/vip2.jpg",
      description: "Official autographed jersey",
      categoryId: vip.id,
    },
    {
      title: "Preferential Access",
      price: 300,
      imageUrl: "https://example.com/gold1.jpg",
      description: "Early entrance to the stadium",
      categoryId: gold.id,
    },
    {
      title: "Monthly raffle",
      price: 150,
      imageUrl: "https://example.com/essential1.jpg",
      description: "Participation in exclusive raffles",
      categoryId: essential.id,
    },
  ];

  for (const prod of products) {
    await prisma.tokenProduct.create({ data: prod });
  }

  console.log("✅ Seed completo con categorías + productos.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });