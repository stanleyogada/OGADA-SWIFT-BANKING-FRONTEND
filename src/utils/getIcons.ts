import vector from "@constants/images/vector";

const switches = {
  getTransactionIcon: (type: string) => {
    switch (type) {
      case "in-houses":
        return {
          icon: vector.transfer_icon(),
          url: "http://localhost:3000/transaction/transfer",
        };
      case "mobiles":
        return {
          icon: vector.data(),
          url: "http://localhost:3000/transaction/transfer",
        };

      case "rewards":
        return {
          icon: vector.cashback(),
          url: "http://localhost:3000/transaction/transfer",
        };

      case "banks":
        return {
          icon: vector.deposit(),
          url: "http://localhost:3000/transaction/transfer",
        };
    }
  },
  parseDate: (created_at: string) => {
    const date = new Date(created_at);
    let month = date.getMonth();
    let year = date.getFullYear();
    let day = date.getDay();
    // TODO: remove this line after creating a function that parses date
  },
};

export default switches;
