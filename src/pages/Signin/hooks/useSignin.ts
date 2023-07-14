import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

type TFormData = {
  phoneNumber: string;
  loginPasscode: string;
};

const useSignin = () => {
  const { handleSignIn, signInMutationState } = useAuth();

  const [formData, setFormData] = useState<TFormData>({
    phoneNumber: "",
    loginPasscode: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSignIn(formData.phoneNumber, formData.loginPasscode);
  };

  useEffect(() => {
    if (signInMutationState.isError) {
      toast.error("Invalid credentials. Please try again!", {
        position: "top-right",
      });
    }
  }, [signInMutationState.isError]);

  return {
    handleInputChange,
    handleSubmit,
    signInMutationState,
    formData,
  };
};

export default useSignin;
