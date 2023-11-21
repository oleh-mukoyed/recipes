import { InputHTMLAttributes } from "react";

export function Input({
  ...props
}: InputHTMLAttributes<HTMLInputElement>): JSX.Element {
  return (
    <input
      className="block w-full rounded-md border-0 py-1.5 pl-2 pr-2 text-sm focus:outline-none text-gray-900 ring-1 ring-inset ring-gray-300"
      {...props}
    />
  );
}
