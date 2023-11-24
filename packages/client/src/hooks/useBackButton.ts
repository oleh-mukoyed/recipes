import { useLocation, useNavigate } from "react-router-dom";
import { useTelegram } from "./useTelegram";
import { useEffect } from "react";
import { Paths } from "pages/Paths";

export const useBackButton = () => {
  const { tg } = useTelegram();
  const navigate = useNavigate();
  const location = useLocation();

  const backButtonClick = () => {
    navigate(-1);
    tg.BackButton.hide();
  };

  useEffect(() => {
    if (location.pathname === Paths.DISHES_PAGE) {
      tg.BackButton.hide();
      return;
    }

    tg.BackButton.show();
    tg.BackButton.onClick(backButtonClick);

    return () => {
      tg.BackButton.hide();
      tg.BackButton.offClick(backButtonClick);
    };
  }, [location]);
};
