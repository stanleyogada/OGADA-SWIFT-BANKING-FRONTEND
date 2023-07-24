import { useMemo } from "react";
import useCurrentUser from "../../../hooks/useCurrentUser";

const useSplash = () => {
  const { isLoading } = useCurrentUser();

  const isAppLoading = useMemo(() => {
    return isLoading;
  }, [isLoading]);

  return {
    isAppLoading,
  };
};

export default useSplash;
