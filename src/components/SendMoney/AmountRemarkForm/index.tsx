import { UseMutationResult } from "react-query";

import AmountRemarkFormWrapper from "./AmountRemarkFormWrapper";

import type { FieldValues, UseFormRegister } from "react-hook-form";
import Input from "../Input";

type TProps = {
  isRecipientFound: boolean;
  isDisabled: boolean;
  sendMoneyMutation: UseMutationResult;
  onSubmit: () => () => unknown;
  register: UseFormRegister<FieldValues>;
};

const AmountRemarkForm = ({ isRecipientFound, isDisabled, sendMoneyMutation, onSubmit, register }: TProps) => {
  return (
    <AmountRemarkFormWrapper isRecipientFound={isRecipientFound} onSubmit={onSubmit()}>
      <Input
        type="text"
        placeholder="Amount"
        rest={{
          ...register("amount", {
            required: true,
            min: 3,
          }),
        }}
      />
      <Input
        type="text"
        placeholder="Note"
        rest={{
          ...register("remark", {
            required: true,
            min: 3,
          }),
        }}
      />

      <button className="transfer-btn" type="submit" disabled={isDisabled}>
        Send money
        {sendMoneyMutation && sendMoneyMutation.isLoading && <div data-testid="loading"></div>}
      </button>

      {sendMoneyMutation.isError && <div data-testid="send-money-error"></div>}
      {sendMoneyMutation.isSuccess && <div data-testid="send-money-success"></div>}
    </AmountRemarkFormWrapper>
  );
};

export default AmountRemarkForm;
