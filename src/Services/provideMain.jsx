import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UerServices from "./services/UserServices";

import  jwt_decode  from 'jwt-decode';

export const User = React.createContext("");

export const Reducer = (state, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "Login":
      return { ...state, user: action.user,auth:action.auth };
  }
};
const MainProvide = ({ children }) => {
  const navigate = useNavigate();

  const login = (token) => {
    var decoded ;
    if (token) {
      decoded=jwt_decode(token);
     
    }
    dispatch({ type: "Login", auth: true ,user:decoded});
    navigate("/home");
  };
  const init = {
    auth: UerServices.isloggedIn(),
    user:UerServices.getloggedInUser()

  };
  const [state, dispatch] = React.useReducer(Reducer, init);

  return <User.Provider value={{ state, login }}>{children}</User.Provider>;
};
const useAuth = () => {
  return useContext(User);
};

export { MainProvide, useAuth };
