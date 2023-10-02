import { TBeneficiary } from "@components/SendMoney/Beneficiaries/types";
import BeneficiariesWrapper from "./BeneficiariesWrapper";

type TProps = {
  showBeneficiaries: boolean;
  beneficiaries: TBeneficiary[];
  onBeneficiaryClick: (beneficiaryAccountNumber: string) => void;
};

const SendMoneyBeneficiaries = ({ showBeneficiaries, beneficiaries, onBeneficiaryClick }: TProps) => {
  if (!showBeneficiaries) return null;

  return (
    <BeneficiariesWrapper>
      <div className="beneficiaries__title">
        <h3>Beneficiaries</h3>
      </div>

      {!beneficiaries.length && (
        <div className="beneficiaries__no-beneficiaries">
          <p>No Beneficiaries</p>
        </div>
      )}

      <div className="beneficiaries__list">
        {beneficiaries.map((beneficiary: TBeneficiary) => (
          <div
            className="user-block beneficiary"
            key={beneficiary.accountNumber}
            data-testid="beneficiary"
            onClick={() => onBeneficiaryClick(beneficiary.accountNumber as string)}
          >
            <img className="user-image" src={beneficiary.avatar} alt="avatar" />
            <div className="text-wrapper">
              <p className="fullname">{beneficiary.accountNumber}</p>
              <p className="phone">{beneficiary.fullName}</p>
            </div>
          </div>
        ))}
      </div>
    </BeneficiariesWrapper>
  );
};

export default SendMoneyBeneficiaries;
