import React from 'react';
import Login from './Login';
import Register from './Register';
import { useFormContext } from '../context/FormContext';
import '../user/Form.css';

function Form() {
  const { view, setView } = useFormContext();

  const renderForm = () => {
    switch (view) {
      case 0:
        return <Login />;
      case 1:
        return <Register />;
      default:
        return null;
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <div className="form-body">{renderForm()}</div>
        <div className="form-toggle">
          <button
            className={view === 0 ? 'selected' : ''}
            onClick={() => setView(0)}
          >
            Login
          </button>
          <button
            className={view === 1 ? 'selected' : ''}
            onClick={() => setView(1)}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Form;
