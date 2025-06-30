import React, { createContext, useContext, useState } from "react";


const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [view, setView] = useState(0);

  return (
    <FormContext.Provider value={{ view, setView }}>
      {children}
    </FormContext.Provider>
  );
};


export const useFormContext = ()=> useContext(FormContext);