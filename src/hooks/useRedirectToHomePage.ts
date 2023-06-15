import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { CLIENT_ROUTES } from "../constants";
import useToken from "./useToken";

function useRedirectToHomePage() {
  const navigate = useNavigate();
  const { token } = useToken();
  const handleRedirect = () => {
    console.log("token", token);
    console.log("redirecting to home");
    //   setTimeout(() => {
    navigate(CLIENT_ROUTES.home);
    //   }, 2000); // TODO: remove this
  };
  useEffect(() => {
    if (token.value) {
      handleRedirect();
    }
  }, [token.value]);
}

export default useRedirectToHomePage;
