const formatToCurrency = (value?: number | string) => {
  if (!value) {
    return "0.00";
  }

  if (typeof value === "string") {
    value = parseFloat(value);
  }
  if (isNaN(value)) {
    return "0.00";
  }

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(value);
};

export default formatToCurrency;
