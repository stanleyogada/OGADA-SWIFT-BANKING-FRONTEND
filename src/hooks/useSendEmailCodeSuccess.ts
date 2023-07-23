import { LOCAL_STORAGE_KEYS } from "../constants";

const useSendEmailCodeSuccess = () => {
  const handler = (email: string) => {
    localStorage.setItem(`TEST${LOCAL_STORAGE_KEYS.sendEmailCodeSuccess}`, "TEST");
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.sendEmailCodeSuccess,
      JSON.stringify({
        email,
        savedAtTime: new Date().getTime(),
      })
    );
  };

  return handler;
};

export default useSendEmailCodeSuccess;
