import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // await prisma.measurement.deleteMany();

  const gram = await prisma.measurement.findFirst({ where: { name: 'Gram' } });
  if (!gram) {
    await prisma.measurement.create({
      data: {
        sort: 10,
        name: 'Gram',
        shortName: 'g',
      },
    });
  }

  const milliliter = await prisma.measurement.findFirst({
    where: { name: 'Milliliter' },
  });
  if (!milliliter) {
    await prisma.measurement.create({
      data: {
        sort: 20,
        name: 'Milliliter',
        shortName: 'ml',
      },
    });
  }

  const kilogram = await prisma.measurement.findFirst({
    where: { name: 'Kilogram' },
  });
  if (!kilogram) {
    await prisma.measurement.create({
      data: {
        sort: 30,
        name: 'Kilogram',
        shortName: 'kg',
        childId: gram.id,
        childMultiplier: 1000,
      },
    });
  }

  const litre = await prisma.measurement.findFirst({
    where: { name: 'Litre' },
  });
  if (!litre) {
    await prisma.measurement.create({
      data: {
        sort: 40,
        name: 'Litre',
        shortName: 'l',
        childId: milliliter.id,
        childMultiplier: 1000,
      },
    });
  }

  const piece = await prisma.measurement.findFirst({
    where: { name: 'Piece' },
  });
  if (!piece) {
    await prisma.measurement.create({
      data: {
        sort: 50,
        name: 'Piece',
        shortName: 'pcs',
      },
    });
  }

  const teaspoon = await prisma.measurement.findFirst({
    where: { name: 'Teaspoon' },
  });
  if (!teaspoon) {
    await prisma.measurement.create({
      data: {
        sort: 70,
        name: 'Teaspoon',
        shortName: 'tsp',
      },
    });
  }

  const tablespoon = await prisma.measurement.findFirst({
    where: { name: 'Tablespoon' },
  });
  if (!tablespoon) {
    await prisma.measurement.create({
      data: {
        sort: 60,
        name: 'Tablespoon',
        shortName: 'tbsp',
        childId: teaspoon.id,
        childMultiplier: 3,
      },
    });
  }

  const cup = await prisma.measurement.findFirst({ where: { name: 'Cup' } });
  if (!cup) {
    await prisma.measurement.create({
      data: {
        sort: 70,
        name: 'Cup',
        shortName: 'c',
        childId: tablespoon.id,
        childMultiplier: 16,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
