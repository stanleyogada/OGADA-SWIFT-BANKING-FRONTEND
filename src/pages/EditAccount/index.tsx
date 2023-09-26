import EditAccountWrapper from "./EditAccountWrapper";
import PageNavHeader from "@components/PageNavHeader";
import Input from "@components/Input";
import useCurrentUser from "@hooks/useCurrentUser";
import { useMutation } from "react-query";
import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";

const useEditUser = () => {
  const { register, formState, getValues, setValue, handleSubmit } = useForm({});

  return { register, formState, getValues, setValue, handleSubmit };
};

const EditAccount = () => {
  const { data } = useCurrentUser();
  const { register, formState, getValues, setValue, handleSubmit } = useEditUser();
  const [credential, setCredential] = useState({
    nickname: data?.nickname,
    email: data?.email,
  });

  const handleSubmitForm = () => {
    return handleSubmit(() => {
      console.log("clicked");
    });
  };

  const handleSaveUserInfo = () => {
    console.log("clicked", formState.isSubmitSuccessful);
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
      <PageNavHeader heading="Edit account" text="Save" handler={handleSubmitForm()} />
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
      </div>
    </EditAccountWrapper>
  );
};

export default EditAccount;
