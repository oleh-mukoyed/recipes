import { InputHTMLAttributes } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface FormInput<T extends FieldValues = FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  regName: Path<T>;
  regOptions?: RegisterOptions<T, Path<T>> | undefined;
  register: UseFormRegister<T>;
}

export function FormInput<T extends FieldValues>({
  register,
  regName,
  regOptions,
  ...props
}: FormInput<T>) {
  return (
    <>
      <input
        className="block w-full rounded-md border-0 py-1.5 pl-2 pr-2 text-lg focus:outline-none text-gray-900 ring-1 ring-inset ring-gray-300"
        {...register(regName, regOptions)}
        {...props}
      />
    </>
  );
}
