import { useTranslation } from "react-i18next";

export function NotFound({ message = "" }: { message?: string }): JSX.Element {
  const { t } = useTranslation();
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {t("page_not_found")}
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          {message ? message : t("page_not_found_msg")}
        </p>
      </div>
    </main>
  );
}
