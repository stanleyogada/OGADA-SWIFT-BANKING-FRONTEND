import { useNavigate } from "react-router-dom";
import { CLIENT_ROUTES } from "../constants";
import { useEffect } from "react";
import useToken from "./useToken";

function useRedirectToAuthPage() {
  const navigate = useNavigate();
  const { token } = useToken();

  const handleRedirect = () => {
    if (!token.value) {
      console.log("redirecting to auth");
      return navigate(CLIENT_ROUTES.authWelcome);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      console.log(token.value);

      handleRedirect();
    }, 2000); // TODO: remove this
  }, [token.value]);
}

export default useRedirectToAuthPage;
