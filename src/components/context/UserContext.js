import React, { useState, useEffect, useContext, createContext} from "react";


const userContxt = createContext()

export const AppProvider = ({children}) =>{
    const [ user, setUser] = useState({
        name:'',
        email:''
    })

    return (
        <userContxt.Provider value={{ user, setUser}}>
            {children}
        </userContxt.Provider>
    )
}

export const useAppcntx = () => useContext(userContxt);
