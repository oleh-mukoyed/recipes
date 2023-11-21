import { useGetUserInfo } from "hooks/useGetUserInfo";
import { Router } from "pages/Router";

export default function App(): JSX.Element {
  const { data, isLoading, error } = useGetUserInfo();

  if (isLoading) return <>Loading...</>;

  if (error) return <>{error?.message}</>;

  if (!data?.id) return <>Access denied</>;

  return <Router />;
}
