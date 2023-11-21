import { Measurement, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const dish1 = await prisma.dish.create({
    data: {
      name: 'dish 1',
      notes: 'dish 1 notes',
      userId: 1,
      ingredients: {
        create: [
          {
            sort: 10,
            name: 'ingredient 1',
            number: '10',
            measurementId: 39,
          },
          {
            sort: 20,
            name: 'ingredient 2',
            measurementId: 41,
            number: '20',
          },
        ],
      },
    },
  });

  const dish2 = await prisma.dish.create({
    data: {
      name: 'dish 2',
      notes: 'dish 2 notes',
      userId: 1,
      ingredients: {
        create: [
          {
            sort: 30,
            name: 'ingredient 3',
            number: '20',
            measurementId: 40,
          },
          {
            sort: 40,
            name: 'ingredient 4',
            measurementId: 43,
            number: '45',
          },
        ],
      },
    },
  });
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
