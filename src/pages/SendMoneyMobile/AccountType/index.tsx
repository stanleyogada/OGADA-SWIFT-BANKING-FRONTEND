import { TUserAccountType } from "@services/users/types";

type TProps = {
  allAccountType: TUserAccountType[];
  handleAccountTypeChange: (type: TUserAccountType) => void;
  accountType: TUserAccountType;
};

const AccountType = ({ allAccountType, handleAccountTypeChange, accountType }: TProps) => (
  <div>
    <h3>From Account?</h3>

    {allAccountType.map((type) => (
      <div
        key={type}
        data-testid="account-type-radio"
        onClick={() => handleAccountTypeChange(type as TUserAccountType)}
        className={accountType === type ? "active" : ""}
      >
        {type}
      </div>
    ))}
  </div>
);

export default AccountType;
