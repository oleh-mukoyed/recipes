export const BaseLayout = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  return <div className="mx-auto max-w-md px-2 pt-2 pb-10">{children}</div>;
};
