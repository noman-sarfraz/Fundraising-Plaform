import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";

function AuthLayout() {
  const token = useSelector(selectCurrentToken);
  if (localStorage.getItem("token")) {
    try {
      const decodedToken = token ? jwtDecode(token) : null;
      const role = decodedToken ? decodedToken.role : null;
      if (role === "Admin") return <Outlet />;
      else {
        alert(role)
        return <Navigate to="/login" />;
      }
    } catch (error) {
      alert('else catch')
      console.log(error);
      return <Navigate to="/login" />;
    }
  } else {
    return <Navigate to="/login" />;
  }
}

export default AuthLayout;
