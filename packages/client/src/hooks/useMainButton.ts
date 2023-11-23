import { MainButton } from "@twa-dev/types";
import { useTelegram } from "hooks/useTelegram";
import { useEffect } from "react";

interface Props {
  text: string;
  clickHandler(): void;
  hideAfterClick?: boolean;
}

export const useMainButton = ({ text, clickHandler }: Props): MainButton => {
  const { tg } = useTelegram();
  const mainButton = tg.MainButton;

  const mainButtonClick = () => {
    clickHandler();
  };

  useEffect(() => {
    mainButton.setText(text);
    mainButton.onClick(mainButtonClick);

    return () => {
      mainButton.offClick(mainButtonClick);
    };
  }, [text, mainButtonClick, location.pathname]);

  return mainButton;
};
