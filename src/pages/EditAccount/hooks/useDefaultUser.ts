import { useQuery } from "react-query";
import { getDefaultUserLoginInfo } from "@services/users";
import { TUser } from "@services/users/types";
type TCurrentUser = {
  current: TUser | undefined;
};
const useDefaultUser = ({ current }: TCurrentUser) => {
  const { data } = useQuery("defualt", getDefaultUserLoginInfo);
  const checkUser = () => {
    if (data?.phone === current?.phone) {
      return true;
    }
    return false;
  };

  return { checkUser };
};

export default useDefaultUser;
