import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function Redirect({ path, redirectTo }: { path: string; redirectTo: string }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname !== path) return;
    navigate(redirectTo);
  }, []);

  return <Outlet />;
}

export default Redirect;
