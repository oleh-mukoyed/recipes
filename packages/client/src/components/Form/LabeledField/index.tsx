interface Props {
  text: string;
  children: JSX.Element | Array<JSX.Element>;
}

export function LabeledField({ text, children }: Props): JSX.Element {
  return (
    <>
      <label /* htmlFor="price" */ className="block text-sm font-medium">
        {text}
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        {Array.isArray(children)
          ? children.map((ch) => {
              return ch;
            })
          : children}
      </div>
    </>
  );
}
