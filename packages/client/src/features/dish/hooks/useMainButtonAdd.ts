import { MainButton } from "@twa-dev/types";
import { useMainButton } from "hooks/useMainButton";
import { Paths } from "pages/Paths";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const useMainButtonAdd = (): MainButton => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const mainButtonClick = () => {
    navigate(Paths.ADD_DISH_PAGE);
  };

  return useMainButton({
    text: t("main_button_add"),
    clickHandler: mainButtonClick,
  });
};
