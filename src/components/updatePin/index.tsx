import Input from "@components/Input";
import { useState } from "react";
import styled from "styled-components";
import { COLORS } from "@constants/colors";
import useChangePin from "./hook/useChangePin";

const UpdatePin = () => {
  const [pin, setPin] = useState({
    oldPin: "",
    newPin: "",
  });

  const { handleFormSubmit, register, updatePinMutation } = useChangePin(pin);

  return (
    <UpdatePinWrapper>
      <div>
        <form onSubmit={handleFormSubmit()}>
          <Input
            data-testid="old-pass-input"
            placeholder="Old login passcode"
            type="Old login passcode"
            {...register("Old login passcode", { maxLength: 6 })}
            onChange={(e) => {
              setPin((oldPass) => ({
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
              setPin((oldPass) => ({
                ...oldPass,
                newPasscode: e.target.value,
              }));
            }}
          />

          <button className="btn" data-testid="updatebtn" type="submit">
            Update
          </button>
        </form>
        {updatePinMutation.isLoading && <p data-testid="load">loading</p>}
        {updatePinMutation.isSuccess && <p data-testid="success">Successfull</p>}
        {updatePinMutation.isError && <p data-testid="error">an arrow has occured</p>}
      </div>
    </UpdatePinWrapper>
  );
};

export default UpdatePin;

const UpdatePinWrapper = styled.div`
  .btn {
    padding: 12px;
    background: ${COLORS.blue};
    color: white;
    border: none;
    border-radius: 4px;
  }
`;
