import { useState } from "react";
import styled from "styled-components";

import Input from "@components/Input";
import { COLORS } from "@constants/colors";

import useChangePasscode from "./hook/useChangePasscode";

const UpdatePasscode = () => {
  const [passcode, setPasscode] = useState({
    oldPasscode: "",
    newPasscode: "",
  });

  const { handleFormSubmit, register, updatePassCodeMutation } = useChangePasscode(passcode);

  return (
    <UpdatePassCodeWrapper>
      <div>
        <form onSubmit={handleFormSubmit()}>
          <Input
            data-testid="old-pass-input"
            placeholder="Old login passcode"
            type="Old login passcode"
            {...register("Old login passcode", { maxLength: 6 })}
            onChange={(e) => {
              setPasscode((oldPass) => ({
                ...oldPass,
                oldPasscode: e.target.value,
              }));
            }}
          />
          <Input
            data-testid="new-pass-input"
            placeholder="New login passcode"
            type="New login passcode"
            {...register("New login passcode", { maxLength: 6 })}
            onChange={(e) => {
              setPasscode((oldPass) => ({
                ...oldPass,
                newPasscode: e.target.value,
              }));
            }}
          />

          <button className="btn" data-testid="updatebtn" type="submit">
            Update
          </button>
        </form>
        {updatePassCodeMutation.isLoading && <p data-testid="load">loading</p>}
        {updatePassCodeMutation.isSuccess && <p data-testid="success">Successful</p>}
        {updatePassCodeMutation.isError && <p data-testid="error">An Error has occurred</p>}
      </div>
    </UpdatePassCodeWrapper>
  );
};

export default UpdatePasscode;

const UpdatePassCodeWrapper = styled.div`
  .btn {
    padding: 12px;
    background: ${COLORS.blue};
    color: white;
    border: none;
    border-radius: 4px;
  }
`;
