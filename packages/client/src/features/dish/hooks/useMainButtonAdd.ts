import { MainButton } from "@twa-dev/types";
import { useMainButton } from "hooks/useMainButton";
import { Paths } from "pages/Paths";
import { useNavigate } from "react-router-dom";

export const useMainButtonAdd = (): MainButton => {
  const navigate = useNavigate();

  const mainButtonClick = () => {
    navigate(Paths.ADD_DISH_PAGE);
  };

  return useMainButton({ text: "Add new dish", clickHandler: mainButtonClick });
};
