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

  // Pick keys from credentials to data type
  const getRequestBody = (credential: TCredentials, data: Pick<TUser, keyof TCredentials>) => {
    let keys = Object.keys(credential) as Array<keyof TCredentials>;

    return keys.reduce((acc, key) => {
      if (credential[key] === data[key]) return acc;

      return {
        ...acc,
        [key]: credential[key],
      };
    }, {} as TCredentials);
  };

  const handleSubmitForm = () => {
    return handleSubmit(() => {
      userMutation.mutate(
        getRequestBody(credential, {
          nickname: data?.nickname,
          email: data?.email as string,
        })
      );
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
