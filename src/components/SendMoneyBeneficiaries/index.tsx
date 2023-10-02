import { TBeneficiary } from "@customTypes/Beneficiary";
import SendMoneyBeneficiariesWrapper from "./SendMoneyBeneficiariesWrapper";

type TProps = {
  showBeneficiaries: boolean;
  beneficiaries: TBeneficiary[];
  onBeneficiaryClick: (beneficiaryAccountNumber: string) => void;
};

const SendMoneyBeneficiaries = ({ showBeneficiaries, beneficiaries, onBeneficiaryClick }: TProps) => {
  if (!showBeneficiaries) return null;

  return (
    <SendMoneyBeneficiariesWrapper>
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
    </SendMoneyBeneficiariesWrapper>
  );
};

export default SendMoneyBeneficiaries;
