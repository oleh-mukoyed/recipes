import { Paths } from "pages/Paths";
import { Link } from "react-router-dom";

export const AddDishButton = (): JSX.Element => {
  return (
    <Link
      to={Paths.ADD_DISH_PAGE}
      className="fixed w-full h-10 text-center pt-2 text-white bg-green-600 hover:bg-green-500 focus-visible:outline-green-600 bottom-0 text-md font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      Add dish
    </Link>
  );
};
