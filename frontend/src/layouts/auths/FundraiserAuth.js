import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { selectCurrentToken } from "../../features/auth/authSlice";
import {useSelector} from 'react-redux'
import jwtDecode from "jwt-decode";

function AuthLayout() {
  const token = useSelector(selectCurrentToken);


  if (localStorage.getItem("token")) {
    try {
    const decodedToken = token ? jwtDecode(token) : null;
    const role = decodedToken ? decodedToken.role : null;
    if (role === "Fundraiser") return <Outlet />;
    else return <Navigate to="/login" />;
    } catch (error) {
      console.log(error);
      return <Navigate to="/login" />;
    }
  } else {
    return <Navigate to="/login" />;
  }
  
}

export default AuthLayout;
