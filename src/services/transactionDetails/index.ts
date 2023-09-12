import { axiosInstance } from "@utils/axiosInstance";

const getOneTransaction = async (type: "banks" | "in-houses" | "rewards" | "mobile", id: string) => {
  const response = await axiosInstance({
    method: "GET",
    url: `/transactions/${type}/${id}`,
  });

  return response.data.data;
};

export default getOneTransaction;
