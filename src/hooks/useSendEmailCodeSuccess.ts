import { LOCAL_STORAGE_KEYS } from "../constants";

const useSendEmailCodeSuccess = () => {
  const handler = (email: string) => {
    const savedAtTime = Date.now();

    const v = JSON.stringify({
      email,
      savedAtTime,
    });

    console.log("savedAtTime", savedAtTime);
    console.log("v", v);

    localStorage.setItem(LOCAL_STORAGE_KEYS.sendEmailCodeSuccess, v);
  };

  return handler;
};

export default useSendEmailCodeSuccess;
