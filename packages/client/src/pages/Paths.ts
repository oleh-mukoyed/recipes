export class Paths {
  static DISHES_PAGE = "/";
  static ADD_DISH_PAGE = "/dishes/add";
  static DISH_PAGE = "/dishes/:id";
  static DISH_EDIT_PAGE = "/dishes/:id/edit";

  static compileDishUrl(id: number): string {
    return Paths.DISH_PAGE.replace(":id", id.toString());
  }

  static compileDishEditUrl(id: number): string {
    return Paths.DISH_EDIT_PAGE.replace(":id", id.toString());
  }
}
