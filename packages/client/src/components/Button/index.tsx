import { clsx } from "clsx";
import { ButtonHTMLAttributes } from "react";

export enum ButtonTypes {
  default = "default",
  danger = "danger",
  success = "success",
  other = "other",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  addClass?: string;
  btnType?: ButtonTypes;
  icon?: JSX.Element | null;
}

export function Button({
  text,
  btnType = ButtonTypes.default,
  addClass = "",
  icon = null,
  ...rest
}: ButtonProps): JSX.Element {
  let bg = "";
  switch (btnType) {
    case ButtonTypes.danger:
      bg = "bg-red-600 hover:bg-red-500 focus-visible:outline-red-600";
      break;

    case ButtonTypes.success:
      bg = "bg-green-600 hover:bg-green-500 focus-visible:outline-green-600";
      break;

    case ButtonTypes.other:
      bg = "bg-blue-600 hover:bg-blue-500 focus-visible:outline-blue-600";
      break;

    default:
      bg = "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600";
      break;
  }

  const textColor = "text-white";
  const classes = clsx(
    "rounded-md px-4 py-1.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    bg,
    textColor,
    addClass
  );

  return (
    <button className={classes} {...rest}>
      {icon && icon}
      {text}
    </button>
  );
}
