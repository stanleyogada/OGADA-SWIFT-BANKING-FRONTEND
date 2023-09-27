import { useForm } from "react-hook-form";

const useEditUser = () => {
  const { register, formState, getValues, setValue, handleSubmit } = useForm({});

  return { register, formState, getValues, setValue, handleSubmit };
};

export default useEditUser;
