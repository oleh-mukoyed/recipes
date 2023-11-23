import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { Button } from "components/Button";
import { useNavigate } from "react-router-dom";

export const BackButton = ({
  addClass = "",
}: {
  addClass?: string;
}): JSX.Element => {
  const navigate = useNavigate();
  return (
    <Button
      icon={
        <ArrowLeftIcon className="h-4 w-auto text-left inline-block mr-1 pb-1" />
      }
      addClass={addClass}
      text="Back"
      onClick={() => navigate(-1)}
    />
  );
};
