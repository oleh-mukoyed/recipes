import { Loader } from "components/Loader";
import { useGetUserInfo } from "hooks/useGetUserInfo";
import { Router } from "pages/Router";

import "i18n";
import { useTranslation } from "react-i18next";

export default function App(): JSX.Element {
  const { data, isLoading, error } = useGetUserInfo();
  const { t } = useTranslation();

  if (isLoading) return <Loader />;

  if (error) return <>{error?.message}</>;

  if (!data?.id) return <>{t("access_denied")}</>;

  return <Router />;
}
