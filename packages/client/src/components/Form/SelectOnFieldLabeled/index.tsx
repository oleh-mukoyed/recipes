interface Props {
  text: string;
  children: JSX.Element;
}

export function SelectOnFieldLabeled({ text, children }: Props): JSX.Element {
  return (
    <div className="absolute inset-y-0 right-0 flex items-center">
      <label /* htmlFor="currency" */ className="sr-only">{text}</label>
      <div className="relative rounded-md shadow-sm pr-1">{children}</div>
    </div>
  );
}
