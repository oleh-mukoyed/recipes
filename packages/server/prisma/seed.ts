import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // await prisma.measurement.deleteMany();

  let gram = await prisma.measurement.findFirst({ where: { name: 'Gram' } });
  if (!gram) {
    gram = await prisma.measurement.create({
      data: {
        sort: 10,
        name: 'Gram',
        shortName: 'g',
      },
    });
  }

  const gramNameLocale = await prisma.measurementName.findFirst({
    where: { measurementId: gram.id },
  });
  if (!gramNameLocale) {
    await prisma.measurementName.createMany({
      data: [
        {
          measurementId: gram.id,
          name: 'Gram',
          locale: 'en',
        },
        {
          measurementId: gram.id,
          name: 'Грам',
          locale: 'uk',
        },
      ],
    });
  }

  const gramShortNameLocale = await prisma.measurementShortName.findFirst({
    where: { measurementId: gram.id },
  });
  if (!gramShortNameLocale) {
    await prisma.measurementShortName.createMany({
      data: [
        {
          measurementId: gram.id,
          name: 'g',
          locale: 'en',
        },
        {
          measurementId: gram.id,
          name: 'г',
          locale: 'uk',
        },
      ],
    });
  }

  let milliliter = await prisma.measurement.findFirst({
    where: { name: 'Milliliter' },
  });
  if (!milliliter) {
    milliliter = await prisma.measurement.create({
      data: {
        sort: 20,
        name: 'Milliliter',
        shortName: 'ml',
      },
    });
  }

  const milliliterNameLocale = await prisma.measurementName.findFirst({
    where: { measurementId: milliliter.id },
  });
  if (!milliliterNameLocale) {
    await prisma.measurementName.createMany({
      data: [
        {
          measurementId: milliliter.id,
          name: 'Milliliter',
          locale: 'en',
        },
        {
          measurementId: milliliter.id,
          name: 'Мілілітр',
          locale: 'uk',
        },
      ],
    });
  }

  const milliliterShortNameLocale = await prisma.measurementShortName.findFirst(
    {
      where: { measurementId: milliliter.id },
    },
  );
  if (!milliliterShortNameLocale) {
    await prisma.measurementShortName.createMany({
      data: [
        {
          measurementId: milliliter.id,
          name: 'ml',
          locale: 'en',
        },
        {
          measurementId: milliliter.id,
          name: 'мл',
          locale: 'uk',
        },
      ],
    });
  }

  let kilogram = await prisma.measurement.findFirst({
    where: { name: 'Kilogram' },
  });
  if (!kilogram) {
    kilogram = await prisma.measurement.create({
      data: {
        sort: 30,
        name: 'Kilogram',
        shortName: 'kg',
        childId: gram.id,
        childMultiplier: 1000,
      },
    });
  }

  const kilogramNameLocale = await prisma.measurementName.findFirst({
    where: { measurementId: kilogram.id },
  });
  if (!kilogramNameLocale) {
    await prisma.measurementName.createMany({
      data: [
        {
          measurementId: kilogram.id,
          name: 'Kilogram',
          locale: 'en',
        },
        {
          measurementId: kilogram.id,
          name: 'Кілограм',
          locale: 'uk',
        },
      ],
    });
  }

  const kilogramShortNameLocale = await prisma.measurementShortName.findFirst({
    where: { measurementId: kilogram.id },
  });
  if (!kilogramShortNameLocale) {
    await prisma.measurementShortName.createMany({
      data: [
        {
          measurementId: kilogram.id,
          name: 'kg',
          locale: 'en',
        },
        {
          measurementId: kilogram.id,
          name: 'кг',
          locale: 'uk',
        },
      ],
    });
  }

  let litre = await prisma.measurement.findFirst({
    where: { name: 'Litre' },
  });
  if (!litre) {
    litre = await prisma.measurement.create({
      data: {
        sort: 40,
        name: 'Litre',
        shortName: 'l',
        childId: milliliter.id,
        childMultiplier: 1000,
      },
    });
  }

  const litreNameLocale = await prisma.measurementName.findFirst({
    where: { measurementId: litre.id },
  });
  if (!litreNameLocale) {
    await prisma.measurementName.createMany({
      data: [
        {
          measurementId: litre.id,
          name: 'Litre',
          locale: 'en',
        },
        {
          measurementId: litre.id,
          name: 'Літр',
          locale: 'uk',
        },
      ],
    });
  }

  const litreShortNameLocale = await prisma.measurementShortName.findFirst({
    where: { measurementId: litre.id },
  });
  if (!litreShortNameLocale) {
    await prisma.measurementShortName.createMany({
      data: [
        {
          measurementId: litre.id,
          name: 'l',
          locale: 'en',
        },
        {
          measurementId: litre.id,
          name: 'л',
          locale: 'uk',
        },
      ],
    });
  }

  let piece = await prisma.measurement.findFirst({
    where: { name: 'Piece' },
  });
  if (!piece) {
    piece = await prisma.measurement.create({
      data: {
        sort: 50,
        name: 'Piece',
        shortName: 'pcs',
      },
    });
  }

  const pieceNameLocale = await prisma.measurementName.findFirst({
    where: { measurementId: piece.id },
  });
  if (!pieceNameLocale) {
    await prisma.measurementName.createMany({
      data: [
        {
          measurementId: piece.id,
          name: 'Piece',
          locale: 'en',
        },
        {
          measurementId: piece.id,
          name: 'Штук',
          locale: 'uk',
        },
      ],
    });
  }

  const pieceShortNameLocale = await prisma.measurementShortName.findFirst({
    where: { measurementId: piece.id },
  });
  if (!pieceShortNameLocale) {
    await prisma.measurementShortName.createMany({
      data: [
        {
          measurementId: piece.id,
          name: 'pcs',
          locale: 'en',
        },
        {
          measurementId: piece.id,
          name: 'шт',
          locale: 'uk',
        },
      ],
    });
  }

  let teaspoon = await prisma.measurement.findFirst({
    where: { name: 'Teaspoon' },
  });
  if (!teaspoon) {
    teaspoon = await prisma.measurement.create({
      data: {
        sort: 70,
        name: 'Teaspoon',
        shortName: 'tsp',
      },
    });
  }

  const teaspoonNameLocale = await prisma.measurementName.findFirst({
    where: { measurementId: teaspoon.id },
  });
  if (!teaspoonNameLocale) {
    await prisma.measurementName.createMany({
      data: [
        {
          measurementId: teaspoon.id,
          name: 'Teaspoon',
          locale: 'en',
        },
        {
          measurementId: teaspoon.id,
          name: 'Чайна ложка',
          locale: 'uk',
        },
      ],
    });
  }

  const teaspoonShortNameLocale = await prisma.measurementShortName.findFirst({
    where: { measurementId: teaspoon.id },
  });
  if (!teaspoonShortNameLocale) {
    await prisma.measurementShortName.createMany({
      data: [
        {
          measurementId: teaspoon.id,
          name: 'tsp',
          locale: 'en',
        },
        {
          measurementId: teaspoon.id,
          name: 'ч.л',
          locale: 'uk',
        },
      ],
    });
  }

  let tablespoon = await prisma.measurement.findFirst({
    where: { name: 'Tablespoon' },
  });
  if (!tablespoon) {
    tablespoon = await prisma.measurement.create({
      data: {
        sort: 60,
        name: 'Tablespoon',
        shortName: 'tbsp',
        childId: teaspoon.id,
        childMultiplier: 3,
      },
    });
  }

  const tablespoonNameLocale = await prisma.measurementName.findFirst({
    where: { measurementId: tablespoon.id },
  });
  if (!tablespoonNameLocale) {
    await prisma.measurementName.createMany({
      data: [
        {
          measurementId: tablespoon.id,
          name: 'Tablespoon',
          locale: 'en',
        },
        {
          measurementId: tablespoon.id,
          name: 'Столова ложка',
          locale: 'uk',
        },
      ],
    });
  }

  const tablespoonShortNameLocale = await prisma.measurementShortName.findFirst(
    {
      where: { measurementId: tablespoon.id },
    },
  );
  if (!tablespoonShortNameLocale) {
    await prisma.measurementShortName.createMany({
      data: [
        {
          measurementId: tablespoon.id,
          name: 'tbsp',
          locale: 'en',
        },
        {
          measurementId: tablespoon.id,
          name: 'ст.л',
          locale: 'uk',
        },
      ],
    });
  }

  let cup = await prisma.measurement.findFirst({ where: { name: 'Cup' } });
  if (!cup) {
    cup = await prisma.measurement.create({
      data: {
        sort: 70,
        name: 'Cup',
        shortName: 'c',
        childId: tablespoon.id,
        childMultiplier: 16,
      },
    });
  }

  const cupNameLocale = await prisma.measurementName.findFirst({
    where: { measurementId: cup.id },
  });
  if (!cupNameLocale) {
    await prisma.measurementName.createMany({
      data: [
        {
          measurementId: cup.id,
          name: 'Cup',
          locale: 'en',
        },
        {
          measurementId: cup.id,
          name: 'Стакан',
          locale: 'uk',
        },
      ],
    });
  }

  const cupShortNameLocale = await prisma.measurementShortName.findFirst({
    where: { measurementId: cup.id },
  });
  if (!cupShortNameLocale) {
    await prisma.measurementShortName.createMany({
      data: [
        {
          measurementId: cup.id,
          name: 'c',
          locale: 'en',
        },
        {
          measurementId: cup.id,
          name: 'ст',
          locale: 'uk',
        },
      ],
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
