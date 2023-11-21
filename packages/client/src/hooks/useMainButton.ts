import { MainButton } from "@twa-dev/types";
import { DEFAULT_BUTTON_COLOR } from "data/constants";
import { useTelegram } from "hooks/useTelegram";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface Props {
  text: string;
  clickHandler(): void;
}

export const useMainButton = ({ text, clickHandler }: Props): MainButton => {
  const { tg } = useTelegram();
  const location = useLocation();
  const mainButton = tg.MainButton;

  const mainButtonClick = () => {
    clickHandler();
    mainButton.hide();
  };

  useEffect(() => {
    mainButton.setParams({
      text: text,
      color: DEFAULT_BUTTON_COLOR,
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
