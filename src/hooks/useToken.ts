import { useEffect, useState } from "react";
import { LOCAL_STORAGE_KEYS } from "../constants";

type TToken = {
  value?: string;
  error?: string;
  isLoading: boolean;
  isInit?: boolean;
};

const TOKEN: TToken = {
  value: localStorage.getItem(LOCAL_STORAGE_KEYS.token) || undefined,
  isLoading: false,
  error: undefined,
  isInit: true,
};

const useToken = () => {
  const [token, setToken] = useState(TOKEN);

  const handleSignin = () => {
    setToken((token) => ({
      ...token,
      isLoading: true,
    }));

    setTimeout(() => {
      // TODO: remove this
      const token = "123456";
      localStorage.setItem(LOCAL_STORAGE_KEYS.token, token);
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
      localStorage.removeItem(LOCAL_STORAGE_KEYS.token);
      setToken({
        value: undefined,
        error: undefined,
        isLoading: false,
      });

      console.log("Signout...");
    }, 2000); // TODO: remove this
  };

  useEffect(() => {
    if (!token.isInit) {
      window.location.reload();
    }
  }, [token.value, token.isInit]);

  return {
    handleSignin,
    handleSignout,
    token,
  };
};

export default useToken;
