export const DISH_QUERY_KEYS = {
  userDishesList: (userId: number) => ["userDishes", userId],
  userDish: (dishId: number) => ["userDish", dishId],
};
