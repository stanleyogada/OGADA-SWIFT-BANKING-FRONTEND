import { TUser } from "@services/users/types";
import { useForm } from "react-hook-form";
import { UseMutationResult } from "react-query";
import { TCredentials } from "..";

type THandleForm = {
  userMutation: UseMutationResult<
    void,
    unknown,
    {
      nickname: string | undefined;
      email: string | undefined;
    },
    unknown
  >;
  credential: TCredentials;
  setCredential: React.Dispatch<React.SetStateAction<TCredentials>>;
  data: TUser | undefined;
};

const useEditUser = ({ userMutation, credential, setCredential, data }: THandleForm) => {
  const { register, formState, getValues, setValue, handleSubmit } = useForm({});

  const handleSubmitForm = () => {
    return handleSubmit(() => {
      if (credential.nickname === data?.nickname && credential.email === data?.email) return;
      userMutation.mutate(credential);
    });
  };

  const handleChangeNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("nickname", e.target.value);
    setCredential({ ...credential, nickname: e.target.value });
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("email", e.target.value);
    setCredential({ ...credential, email: e.target.value });
  };

  return {
    register,
    formState,
    getValues,
    setValue,
    handleSubmit,
    handleSubmitForm,
    handleChangeEmail,
    handleChangeNickName,
  };
};

export default useEditUser;
