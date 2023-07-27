import { LOCAL_STORAGE_KEYS } from "@constants/index";

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
