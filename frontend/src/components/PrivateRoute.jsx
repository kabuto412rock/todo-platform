import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./Spinner";

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  useEffect(() => {
    if (!checkingStatus && !loggedIn) {
      toast.warning("登入後才可進行操作，3Q");
    }
  }, [checkingStatus, loggedIn]);
  if (checkingStatus) {
    return <Spinner />;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
