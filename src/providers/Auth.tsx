import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { ONBOARD_PATH } from "../constants";
import { getUserFromLS } from "../utils/common";
import "../index.css";

const AuthProvider = () => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const currentUser = getUserFromLS();
      if (currentUser) return;
      navigate(ONBOARD_PATH, { replace: true });
    } catch (error) {
      navigate(ONBOARD_PATH, { replace: true });
    }
  }, []);

  return (
    <div className="app-container">
      <Outlet />
    </div>
  );
};

export default AuthProvider;
