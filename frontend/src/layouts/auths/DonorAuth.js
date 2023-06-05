import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";

function AuthLayout() {
  const user = useSelector(selectCurrentUser);

  if (localStorage.getItem("user")) {
    const role = user.role;
    if (role === "Donor") return <Outlet />;
    else return <Navigate to="/login" />;
  } else {
    return <Navigate to="/login" />;
  }
}

export default AuthLayout;
