import { MainButton } from "@twa-dev/types";
import { SUCCESS_BUTTON_COLOR } from "data/constants";
import { useTelegram } from "hooks/useTelegram";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface Props {
  text: string;
  clickHandler(): void;
  hideAfterClick?: boolean;
  color?: string;
}

export const useMainButton = ({
  text,
  clickHandler,
  hideAfterClick = true,
  color = SUCCESS_BUTTON_COLOR,
}: Props): MainButton => {
  const { tg } = useTelegram();
  const location = useLocation();
  const mainButton = tg.MainButton;

  const mainButtonClick = () => {
    clickHandler();
    hideAfterClick && mainButton.hide();
  };

  useEffect(() => {
    mainButton.setParams({
      text: text,
      color: color,
    });
    mainButton.show();
    mainButton.onClick(mainButtonClick);

    return () => {
      mainButton.offClick(mainButtonClick);
    };
  }, []);

  useEffect(() => {
    return () => {
      mainButton.hide();
    };
  }, [location.pathname]);

  return mainButton;
};
