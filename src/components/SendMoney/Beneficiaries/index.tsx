import { TBeneficiary } from "@components/SendMoney/Beneficiaries/types";

import BeneficiariesWrapper from "./BeneficiariesWrapper";
import ListItem from "../ListItem";
import { SEND_MONEY_MOBILE_NETWORKS } from "@constants/index";

type TProps = {
  showBeneficiaries: boolean;
  beneficiaries: TBeneficiary[];
  onBeneficiaryClick: (beneficiaryAccountNumber: string, beneficiaryPhoneNumber?: string) => void;
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
            key={beneficiary.accountNumber || beneficiary.phoneNumber}
            imgSrc={
              (beneficiary.avatar as string) ||
              (SEND_MONEY_MOBILE_NETWORKS.find((network) => network.id === beneficiary.operator)?.logo as string)
            }
            text={(beneficiary.fullName as string) || (beneficiary.phoneNumber as string)}
            secondaryText={(beneficiary.accountNumber as string) || beneficiary.operator?.toUpperCase()}
            dataTestid="beneficiary"
            onClick={() => onBeneficiaryClick(beneficiary.accountNumber as string, beneficiary.phoneNumber as string)}
          />
        ))}
      </div>
    </BeneficiariesWrapper>
  );
};

export default Beneficiaries;
