import { useEffect, useState } from "react";

const useSplash = () => {
  const [isAppLoading, setIsAppLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      setTimeout(() => setIsAppLoading(false), 1000);
    } catch (e) {
      console.log(e);
      setIsAppLoading(false);
    }
  }, []);

  return {
    isAppLoading,
  };
};

export default useSplash;
