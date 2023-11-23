export const BaseLayout = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  return (
    <div className="main_bg main_color mx-auto max-w-md px-2 pt-2 pb-10">
      {children}
    </div>
  );
};
