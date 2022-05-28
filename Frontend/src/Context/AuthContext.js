import React, { useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = React.createContext();
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;


const AuthContextProvider = props => {
  console.log('The axios base url is ',process.env.REACT_APP_BASE_URL);

  const [activeUser, setActiveUser] = useState({})
  const [config, setConfig] = useState({
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  })


  useEffect(() => {
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

    const controlAuth = async () => {
      try {
        const { data } = await axios.get("/auth/private", config);
        setActiveUser(data.user)
      }
      catch (error) {

        localStorage.removeItem("authToken");

        setActiveUser({})
      }
    };
    controlAuth()

  }, [])

  return (
    <AuthContext.Provider value={{ activeUser, setActiveUser, config, setConfig }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
