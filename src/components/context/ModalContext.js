import React, { createContext, useContext } from "react";
import TakeInput from "../app/entries/TakeEntry";
import '../context/stylecontext/EntryModal.css'



const modalCntx = createContext();

export const ModalProvider = ({ children }) => {
  const modalcontent = TakeInput(null);
  const isVisible = TakeInput(false);

  const showModal = (content) => {
    modalcontent.setVal(content);
    isVisible.setVal(true);
  };

  const hideModal = () => {
    modalcontent.setVal(null);
    isVisible.setVal(false);
  };

  return (
    <modalCntx.Provider value={{ showModal, hideModal }}>
      {children}
      {
        isVisible.val && (
          <div className="modal-overlay">
            <div className="modal-content">
              {modalcontent.val}
              <button onClick={hideModal}>Close</button>
            </div>
          </div>
        )
      }
    </modalCntx.Provider>
  );
};

export const useModal = () => useContext(modalCntx);
