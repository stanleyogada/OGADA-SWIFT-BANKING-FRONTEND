import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import getOneTransaction from "@services/transactionDetails";
import { response } from "msw";

const Details = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState();

  useEffect(() => {
    const getTransaction = async () => {
      const response = await getOneTransaction("banks", id as string);
      setTransaction(response);
    };

    getTransaction();
  }, []);

  console.log(id);
  return <h1>{id}</h1>;
};

export default Details;
