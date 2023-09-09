import vector from "@constants/images/vector";

const getIcon = (type: string) => {
  switch (type) {
    case "in-houses":
      return {
        icon: vector.inHouse(),
        url: "http://localhost:3000/transaction/transfer",
      };
    case "mobiles":
      return {
        icon: vector.mobile(),
        url: "http://localhost:3000/transaction/transfer",
      };

    case "rewards":
      return {
        icon: vector.rewards(),
        url: "http://localhost:3000/transaction/transfer",
      };

    case "banks":
      return {
        icon: vector.banks(),
        url: "http://localhost:3000/transaction/transfer",
      };
  }
};

export default getIcon;
