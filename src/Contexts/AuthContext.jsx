import { useState, createContext } from "react";

export const AuthContext = createContext();

export default function TokenContextProvider({ children }) {
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem("token") !== null
  );

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </AuthContext.Provider>
  );
}