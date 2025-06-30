import React, { createContext, useState, useContext } from "react";


const AuthContext = createContext()


export const AuthProvider = ({children})=>{
    const [ auth, setAuth] = useState({
        userId: null,
        token: null
    })

    const setAuthData = (userId, token) => {
    setAuth({ userId, token });
  };

  return (
    <AuthContext.Provider value={ {auth, setAuthData} }>
        { children }
    </AuthContext.Provider>
  )
    
}

export function useAuth() {
  return useContext(AuthContext);
}