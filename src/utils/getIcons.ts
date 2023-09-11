import vector from "@constants/images/vector";

const getIcon = (type: string) => {
  switch (type) {
    case "in-houses":
      return {
        icon: vector.inHousesIcon(),
      };
    case "mobiles":
      return {
        icon: vector.mobileIcon(),
      };

    case "rewards":
      return {
        icon: vector.rewardsIcon(),
      };

    case "banks":
      return {
        icon: vector.banksIcon(),
      };
  }
};

export default getIcon;
