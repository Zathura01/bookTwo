import React, { useState, createContext, useContext } from 'react'

const TransContext = createContext();

export const TransProvider =({children})=>{
    const [ trans, setTrans] = useState(0)

    return (
        <>
        <TransContext.Provider value={{trans, setTrans}}>
            {children}
        </TransContext.Provider>
        </>
    )

}

export const useTrans = ()=> useContext(TransContext);