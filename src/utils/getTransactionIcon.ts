import vector from "@constants/images/vector";
import { ETransactionAllType } from "@services/transaction/types";

const getTransactionIcon = (type: ETransactionAllType) => {
  switch (type) {
    case ETransactionAllType.IN_HOUSES:
      return vector.inHousesIcon();

    case ETransactionAllType.MOBILES:
      return vector.mobileIcon();

    case ETransactionAllType.REWARDS:
      return vector.rewardsIcon();

    case ETransactionAllType.BANKS:
      return vector.banksIcon();
  }
};

export default getTransactionIcon;
