import { CLIENT_ROUTES } from "@constants/routes";
import useAuth from "@hooks/useAuth";
import { useCallback, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const usePageWrapper = () => {
  const navigate = useNavigate();
  const { userIsAuthenticated } = useAuth();
  const { pathname } = useLocation();

  const isAuthPage = useMemo(() => pathname.includes("auth"), [pathname]);

  const handleRedirect = useCallback(() => {
    if (!isAuthPage && !userIsAuthenticated) {
      navigate(CLIENT_ROUTES.authSignin);
    } else if (isAuthPage && userIsAuthenticated) {
      navigate(CLIENT_ROUTES.home);
    }
  }, [isAuthPage, userIsAuthenticated]);

  useEffect(() => {
    handleRedirect();
  }, [handleRedirect]);
};

export default usePageWrapper;
