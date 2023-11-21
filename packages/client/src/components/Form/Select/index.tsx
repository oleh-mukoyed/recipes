import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<{ value: string; name: string }>;
}

export function Select({ options, ...props }: SelectProps): JSX.Element {
  return (
    <select
      className="h-full max-h-20 bg-white rounded-md border-0 bg-transparent py-0 pl-2 pr-1 text-gray-900 text-sm"
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
