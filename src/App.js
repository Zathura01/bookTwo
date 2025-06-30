import React from 'react';
import './App.css';
import Form from './components/user/Form';
import Home from './components/app/Home';
import { AppProvider } from './components/context/UserContext';
import { ModalProvider } from './components/context/ModalContext';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { FormProvider } from './components/context/FormContext';
import { AuthProvider } from './components/context/AuthContext';
import { TransProvider } from './components/context/TransactionContext';
import ForgotPassword from './components/user/ForgotPassword';

function App() {
  return (
    <AuthProvider>
      <TransProvider>
    <AppProvider>
      <ModalProvider>
        <FormProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Form />} />
            <Route path="/home" element={<Home />} />
            <Route path='/forgotPassword' element={<ForgotPassword />} />
          </Routes>
        </Router>
        </FormProvider>
      </ModalProvider>
    </AppProvider>
    </TransProvider>
    </AuthProvider>
  );
}

export default App;
