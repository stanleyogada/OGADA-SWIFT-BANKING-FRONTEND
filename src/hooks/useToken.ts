import { useEffect, useMemo, useState } from "react";

type TToken = {
  value?: string;
  error?: string;
  isLoading: boolean;
};

const TOKEN: TToken = {
  value: undefined,
  isLoading: false,
  error: undefined,
};

const useToken = () => {
  const [token, setToken] = useState(TOKEN);

  useEffect(() => {
    const token = localStorage.getItem("token") || undefined;
    setToken({
      value: token,
      error: undefined,
      isLoading: false,
    });
  }, []);

  const handleSignin = () => {
    setToken((token) => ({
      ...token,
      isLoading: true,
    }));

    setTimeout(() => {
      // TODO: remove this
      const token = "123456";
      localStorage.setItem("token", token);
      setToken({
        value: token,
        error: undefined,
        isLoading: false,
      });

      console.log("token", token);
      console.log("Signin...");
    }, 2000); // TODO: remove this
  };

  const handleSignout = () => {
    setToken((token) => ({
      ...token,
      isLoading: true,
    }));

    setTimeout(() => {
      // TODO: remove this
      localStorage.removeItem("token");
      setToken({
        value: undefined,
        error: undefined,
        isLoading: false,
      });

      console.log("Signout...");
    }, 2000); // TODO: remove this
  };

  // const tokenHasLoaded = useMemo(
  //   () => (token.value !== undefined || token.error !== undefined) && token.isLoading === false,
  //   [token.value, token.error, token.isLoading]
  // );

  return {
    handleSignin,
    handleSignout,
    token,
    // tokenHasLoaded,
  };
};

export default useToken;
