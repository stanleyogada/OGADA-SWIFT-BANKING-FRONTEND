import { TBeneficiary } from "@customTypes/Beneficiary";

type TProps = {
  showBeneficiaries: boolean;
  beneficiaries: TBeneficiary[];
  onBeneficiaryClick: (beneficiaryAccountNumber: string) => void;
};

const SendMoneyBeneficiaries = ({ showBeneficiaries, beneficiaries, onBeneficiaryClick }: TProps) => {
  if (!showBeneficiaries) return null;

  return (
    <div>
      <div className="beneficiaries">
        <h3>Beneficiaries</h3>
      </div>

      {!beneficiaries.length && <p>No Beneficiaries</p>}

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
  );
};

export default SendMoneyBeneficiaries;
