import { TBeneficiary } from "@components/SendMoney/Beneficiaries/types";

import BeneficiariesWrapper from "./BeneficiariesWrapper";
import ListItem from "../ListItem";

type TProps = {
  showBeneficiaries: boolean;
  beneficiaries: TBeneficiary[];
  onBeneficiaryClick: (beneficiaryAccountNumber: string) => void;
};

const Beneficiaries = ({ showBeneficiaries, beneficiaries, onBeneficiaryClick }: TProps) => {
  if (!showBeneficiaries) return null;

  return (
    <BeneficiariesWrapper hasBeneficiaries={!!beneficiaries.length}>
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
          <ListItem
            key={beneficiary.accountNumber}
            imgSrc={beneficiary.avatar as string}
            text={beneficiary.fullName as string}
            secondaryText={beneficiary.accountNumber as string}
            dataTestid="beneficiary"
            onClick={() => onBeneficiaryClick(beneficiary.accountNumber as string)}
          />
        ))}
      </div>
    </BeneficiariesWrapper>
  );
};

export default Beneficiaries;
