import { clsx } from "clsx";
import React from "react";
import { ButtonHTMLAttributes } from "react";

export enum ButtonTypes {
  default = "default",
  danger = "danger",
  other = "other",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  addClass?: string;
  btnType?: ButtonTypes;
  icon?: JSX.Element | null;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      text,
      btnType = ButtonTypes.default,
      addClass = "",
      icon = null,
      ...rest
    }: ButtonProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    let bg = "";
    switch (btnType) {
      case ButtonTypes.danger:
        bg =
          "bg-red-600 hover:bg-red-500 focus-visible:outline-red-600 tg-button_text_color";
        break;

      case ButtonTypes.other:
        bg =
          "bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50";
        break;

      default:
        bg = "tg-button_text_color tg-button_color";
        break;
    }

    //const textColor = "text-white";
    const classes = clsx(
      "rounded-md px-4 py-1.5 text-lg font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
      bg,
      //textColor,
      addClass
    );

    return (
      <button className={classes} ref={ref} {...rest}>
        {icon && icon}
        {text}
      </button>
    );
  }
);
