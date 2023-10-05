import ListItem from "@components/SendMoney/ListItem";
import { DEFAULT_BANK_LOGO } from "@constants/index";

import type { TBank } from "@services/banks/types";

const BankItem = ({
  dataTestid,
  bankName,
  bankLogo,
  onClick,
}: {
  bankName: TBank["name"];
  bankLogo: TBank["logo"];
  onClick?: () => void;
  dataTestid?: string;
}) => {
  const bank = {
    name: bankName,
    logo: bankLogo,
  };

  return (
    <ListItem imgSrc={bank.logo || DEFAULT_BANK_LOGO} text={bank.name} dataTestid={dataTestid} onClick={onClick} />
  );
};

export default BankItem;
