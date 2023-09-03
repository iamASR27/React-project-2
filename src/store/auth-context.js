import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const history = useHistory();
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);

  useEffect(() => {
    let id = null;
    if (token) {
      id = setTimeout(() => {
        setToken(null);
        localStorage.removeItem("token");
        history.replace("/auth");
      }, 300000);
    }
    return () => {
      clearTimeout(id);
    };
  }, [token, history]);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
