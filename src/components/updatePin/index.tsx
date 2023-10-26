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
      <div className="overlay">LOCKED</div>

      <div>
        <form onSubmit={handleFormSubmit()}>
          <Input
            data-testid="old-pass-input"
            placeholder="Old transfer pin"
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
            placeholder="New transfer pin"
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
            Update Transfer Pin
          </button>
        </form>
        {updatePinMutation.isLoading && <p data-testid="load">loading</p>}
        {updatePinMutation.isSuccess && <p data-testid="success">Successful</p>}
        {updatePinMutation.isError && <p data-testid="error">An Error has occurred</p>}
      </div>
    </UpdatePinWrapper>
  );
};

export default UpdatePin;

const UpdatePinWrapper = styled.div`
  position: relative;

  .overlay {
    font-style: italic;
    font-size: 80px;
    font-weight: 700;

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;

    display: grid;
    place-items: center;

    background-color: rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.25);
  }

  .btn {
    padding: 12px;
    background: ${COLORS.blue};
    color: white;
    border: none;
    border-radius: 4px;
  }
`;
