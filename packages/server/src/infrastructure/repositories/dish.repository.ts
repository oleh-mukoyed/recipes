import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { DishModel } from '../../domain/model/dish';
import { DishRepository } from '../../domain/repositories/dishRepository.interface';
import { PrismaService } from '../prisma.service';

export type DishEntity = Prisma.DishGetPayload<{
  include: {
    ingredients: {
      include: {
        measurement: {
          include: {
            child: true;
            parent: true;
          };
        };
      };
    };
  };
}>;

@Injectable()
export class DatabaseDishRepository implements DishRepository {
  constructor(private readonly prisma: PrismaService) {}

  async delete(dishId: number): Promise<DishModel> {
    const result = await this.prisma.dish.delete({ where: { id: dishId } });

    return result as DishModel;
  }

  async add(dish: Partial<DishModel>): Promise<DishModel> {
    const ingredients: Prisma.IngredientUpdateManyWithoutDishNestedInput = {};
    ingredients.create = dish.ingredients.map((ingredient) => ({
      name: ingredient.name,
      number: ingredient.number,
      measurementId: ingredient.measurementId,
    }));
    console.log('add ingredients :', ingredients);

    const result = await this.prisma.dish.create({
      data: {
        userId: dish.userId,
        name: dish.name,
        notes: dish.notes,
        ingredients: ingredients,
      },
    });
    console.log('result :', result);

    return result as DishModel;
  }

  async update(dish: Partial<DishModel>): Promise<DishModel> {
    const createIngredients = dish.ingredients.filter(
      (ingredient) => ingredient.id === 0,
    );

    const updateIngredients = dish.ingredients.filter(
      (ingredient) => ingredient.id > 0,
    );

    console.log('dish :', dish);

    const ingredients: Prisma.IngredientUpdateManyWithoutDishNestedInput = {};
    if (createIngredients.length) {
      ingredients.create = createIngredients.map((ingredient) => ({
        name: ingredient.name,
        number: ingredient.number,
        measurementId: ingredient.measurementId,
      }));
    }

    const updateIds: Array<number> = [];
    if (updateIngredients.length) {
      const updateMany = [];
      updateIngredients.forEach((ingredient) => {
        updateIds.push(ingredient.id);
        updateMany.push({
          where: { id: ingredient.id },
          data: {
            name: ingredient.name,
            number: ingredient.number,
            measurementId: ingredient.measurementId,
          },
        });
      });
      ingredients.updateMany = updateMany;
    }

    const deleteIngredients = await this.prisma.ingredient.findMany({
      where: {
        dishId: dish.id,
        id: {
          notIn: updateIds,
        },
      },
      select: { id: true },
    });
    ingredients.deleteMany = deleteIngredients.map((ingredient) => ({
      id: ingredient.id,
    }));
    console.log('ingredients :', ingredients);

    const result = await this.prisma.dish.update({
      where: { id: dish.id },
      data: {
        name: dish.name,
        notes: dish.notes,
        ingredients: ingredients,
      },
    });

    console.log('result :', result);
    return result as DishModel;
  }

  async findAllForUser(userId: number): Promise<DishModel[]> {
    const result = await this.prisma.dish.findMany({
      where: { userId: userId, active: true },
      orderBy: [{ sort: 'asc' }, { createdAt: 'asc' }],
      select: { id: true, sort: true, userId: true, name: true, notes: true },
    });

    return result as Array<DishModel>;
  }

  async findByIdForUser(id: number, userId: number): Promise<DishModel> {
    const result = await this.prisma.dish.findFirstOrThrow({
      where: { id: id, userId: userId, active: true },
      select: {
        id: true,
        sort: true,
        name: true,
        notes: true,
        userId: true,
        ingredients: {
          select: {
            id: true,
            sort: true,
            name: true,
            number: true,
            measurement: {
              select: {
                id: true,
                name: true,
                shortName: true,
                childMultiplier: true,
                child: {
                  select: {
                    id: true,
                    name: true,
                    shortName: true,
                    childMultiplier: true,
                  },
                },
                parent: {
                  select: {
                    id: true,
                    name: true,
                    shortName: true,
                    childMultiplier: true,
                  },
                },
              },
            },
          },
          orderBy: [{ sort: 'asc' }, { createdAt: 'asc' }],
        },
      },
    });

    return result as DishModel;
  }
}
