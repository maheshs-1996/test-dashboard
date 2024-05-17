import { useEffect, useState } from "react";
import { getUserFromLS } from "../utils/common";

const defaultUserObj = {
  name: "",
  password: "",
  username: "",
};

const useUserData = () => {
  const [data, setData] = useState(defaultUserObj);
  useEffect(() => {
    try {
      const user = getUserFromLS();
      setData(user);
    } catch (error) {
      setData(defaultUserObj);
    }
  }, []);
  return data;
};

export default useUserData;
