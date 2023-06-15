import { useCallback, useEffect, useMemo } from "react";
import { CLIENT_ROUTES } from "../../../constants";
import { useLocation, useNavigate } from "react-router-dom";
import useToken from "../../../hooks/useToken";

const usePageWrapper = () => {
  const { token } = useToken();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isAuthPage = useMemo(() => pathname.includes("auth"), [pathname]);

  const handleRedirect = useCallback(() => {
    if (!isAuthPage && !token.value) {
      navigate(CLIENT_ROUTES.authSignin);
    } else if (isAuthPage && token.value) {
      navigate(CLIENT_ROUTES.home);
    }
  }, [isAuthPage, token.value]);

  useEffect(() => {
    handleRedirect();
  }, [handleRedirect]);
};

export default usePageWrapper;
