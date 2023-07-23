import { LOCAL_STORAGE_KEYS } from "../constants";

const useSendEmailCodeSuccess = () => {
  const handler = (email: string) => {
    const savedAtTime = Date.now();

    localStorage.setItem(
      LOCAL_STORAGE_KEYS.sendEmailCodeSuccess,
      JSON.stringify({
        email,
        savedAtTime,
      })
    );
  };

  return handler;
};

export default useSendEmailCodeSuccess;
