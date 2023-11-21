import { SelectHTMLAttributes } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface SelectProps<T extends FieldValues = FieldValues>
  extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<{ value: string; name: string }>;
  regName: Path<T>;
  regOptions?: RegisterOptions<T, Path<T>> | undefined;
  register: UseFormRegister<T>;
}

export function FormSelect<T extends FieldValues>({
  register,
  regName,
  regOptions,
  options,
  ...props
}: SelectProps<T>): JSX.Element {
  return (
    <select
      className="h-full max-h-20 bg-white rounded-md border-0 bg-transparent py-0 pl-1 pr-1 text-gray-900 text-sm"
      {...register(regName, regOptions)}
      {...props}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
}
