import EditAccountWrapper from "./EditAccountWrapper";
import PageNavHeader from "@components/PageNavHeader";
import Input from "@components/Input";
import useCurrentUser from "@hooks/useCurrentUser";
import { useForm } from "react-hook-form";
import { useState } from "react";
import usePatchUser from "./hooks/usePatchUser";
import SplashScreen from "@components/SplashScreen";

const useEditUser = () => {
  const { register, formState, getValues, setValue, handleSubmit } = useForm({});

  return { register, formState, getValues, setValue, handleSubmit };
};

const EditAccount = () => {
  const { data, isError } = useCurrentUser();
  const { updateUserMutation } = usePatchUser();
  const { register, setValue, handleSubmit } = useEditUser();
  const [credential, setCredential] = useState({
    nickname: data?.nickname,
    email: data?.email,
  });

  const handleSubmitForm = () => {
    return handleSubmit(() => {
      const userMutation = updateUserMutation.mutate(credential);
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

  // FIXME: fix page reload afer submit form

  return (
    <EditAccountWrapper>
      {updateUserMutation.isLoading && <SplashScreen />}
      <PageNavHeader heading="Edit account" text="Save" handler={handleSubmitForm()} />
      <div className="content-wrapper">
        {data && (
          <div data-testid="content">
            <p className="paragraph">Personal Information</p>
            <div className="personalIfo">
              <Input label="First name" placeholder="first name" value={data?.first_name} disabled={true} />
              <Input label="Middle name" placeholder="middle name" value={data?.middle_name} disabled={true} />
              <Input label="Last name" placeholder="last name" value={data?.last_name} disabled={true} />
            </div>
            <hr className="line" />
            <p className="paragraph">Address and contact information</p>
            <div className="addressIfo">
              <Input label="Full name" placeholder="full name" value={data?.fullName} disabled={true} />
              <Input label="Phone number" placeholder="phone number" value={data?.phone} disabled={true} />
              <Input
                label="Nickname"
                placeholder="nickname"
                value={credential.nickname}
                {...register("nickname", {})}
                onChange={handleChangeNickName}
              />
              <Input
                label="Email"
                placeholder="email"
                value={credential.email}
                {...register("email", {})}
                onChange={handleChangeEmail}
              />
              <Input label="Opay Account Number" placeholder="account number" value={data?.phone} disabled={true} />
              {updateUserMutation.isSuccess && <p data-testid="success">User updated successfully!</p>}
            </div>
          </div>
        )}
      </div>
      {updateUserMutation.isLoading && <p data-testid="loading">Loading</p>}
      {updateUserMutation.isError && <p data-testid="post-error">Error</p>}
      {isError && <p data-testid="error">Error</p>}
    </EditAccountWrapper>
  );
};

export default EditAccount;
