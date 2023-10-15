import { TUserAccountType } from "@services/users/types";
import AccountTypeWrapper from "./AccountTypeWrapper";

type TProps = {
  allAccountType: TUserAccountType[];
  handleAccountTypeChange: (type: TUserAccountType) => void;
  accountType: TUserAccountType;
};

const AccountType = ({ allAccountType, handleAccountTypeChange, accountType }: TProps) => (
  <AccountTypeWrapper>
    {allAccountType.map((type) => (
      <div
        key={type}
        data-testid="account-type-radio"
        onClick={() => handleAccountTypeChange(type as TUserAccountType)}
        className={accountType === type ? "radio active" : "radio"}
      >
        {type}
      </div>
    ))}
  </AccountTypeWrapper>
);

export default AccountType;
