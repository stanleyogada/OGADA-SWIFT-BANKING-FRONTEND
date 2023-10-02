import { UseMutationResult } from "react-query";

import AmountRemarkFormWrapper from "./AmountRemarkFormWrapper";

import type { FieldValues, UseFormRegister } from "react-hook-form";

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
      <input
        type="text"
        className="recipient-input"
        placeholder="Amount"
        {...register("amount", {
          required: true,
          min: 3,
        })}
      />
      <input
        className="recipient-input"
        type="text"
        placeholder="Note"
        {...register("remark", {
          required: true,
          min: 3,
        })}
      />

      <button className="transfer-btn" type="submit" disabled={isDisabled}>
        Send money
        {sendMoneyMutation && sendMoneyMutation.isLoading && <div data-testid="loading">Sending money...</div>}
      </button>

      {sendMoneyMutation.isError && <div data-testid="send-money-error">Error sending money</div>}
      {sendMoneyMutation.isSuccess && <div data-testid="send-money-success">Money sent successfully</div>}
    </AmountRemarkFormWrapper>
  );
};

export default AmountRemarkForm;
