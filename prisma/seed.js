const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    const existing = await prisma.tokenProduct.findFirst();
    if (existing) {
      console.log("🟡 Productos ya existen, omitiendo seed.");
      return;
    }    
  const categories = [
    { name: "VIP" },
    { name: "GOLD" },
    { name: "BLACK" },
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
  const black = await prisma.tokenCategory.findUnique({ where: { name: "BLACK" } });

  const products = [
    {
      title: "Meet & Greet",
      price: 1000,
      imageUrl: "https://example.com/vip1.jpg",
      description: "Encuentro exclusivo con jugadores",
      categoryId: vip.id,
    },
    {
      title: "Camiseta Firmada",
      price: 500,
      imageUrl: "https://example.com/vip2.jpg",
      description: "Camiseta oficial autografiada",
      categoryId: vip.id,
    },
    {
      title: "Acceso Preferencial",
      price: 300,
      imageUrl: "https://example.com/gold1.jpg",
      description: "Entrada anticipada al estadio",
      categoryId: gold.id,
    },
    {
      title: "Sorteo mensual",
      price: 150,
      imageUrl: "https://example.com/black1.jpg",
      description: "Participación en sorteos exclusivos",
      categoryId: black.id,
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