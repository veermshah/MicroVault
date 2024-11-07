import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userAddress, setUserAddress] = useState("");

  return (
    <UserContext.Provider value={{ userAddress, setUserAddress }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
