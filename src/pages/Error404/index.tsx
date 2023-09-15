import { CLIENT_ROUTES } from "@constants/routes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Error404 = ({ is404Error }: { is404Error: boolean }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (is404Error) {
      console.log({
        is404Error,
      });
      navigate(CLIENT_ROUTES._404);
    }
  }, [is404Error]);

  return <div data-testid="error404">404</div>;
};

export default Error404;
