import { useCallback, useEffect, useMemo } from "react";
import { useLocation, redirect } from "react-router-dom";

import { CLIENT_ROUTES } from "../../../constants";
import useSplash from "../../App/hooks/useSplash";
import useAuth from "../../../hooks/useAuth";

const usePageWrapper = () => {
  const { userIsAuthenticated } = useAuth();
  const { pathname } = useLocation();

  const isAuthPage = useMemo(() => pathname.includes("auth"), [pathname]);

  const handleRedirect = useCallback(() => {
    console.log("userIsAuthenticated", userIsAuthenticated);
    console.log("isAuthPage", isAuthPage);

    if (!isAuthPage && !userIsAuthenticated) {
      console.log(userIsAuthenticated);

      redirect(CLIENT_ROUTES.authSignin);
    } else if (isAuthPage && userIsAuthenticated) {
      redirect(CLIENT_ROUTES.home);
    }
  }, [isAuthPage, userIsAuthenticated]);

  useEffect(() => {
    handleRedirect();
  }, [handleRedirect]);
};

export default usePageWrapper;
