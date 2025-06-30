import React from "react";
import TakeInput from "./TakeEntry";
import { useAuth } from "../../context/AuthContext";
import { useTrans } from '../../context/TransactionContext';
import '../entries/cssfiles/Expense.css'



const creditTo = ['SBI', 'AXIS', 'IDBI', 'MISC'];

const IncomeEntry = () => {
  const { trans, setTrans } = useTrans();
  const { auth } = useAuth();

  const source = TakeInput('');
  const amt = TakeInput(0);
  const date = TakeInput(new Date().toISOString().substring(0, 16));
  const cmt = TakeInput('');
  const credit = TakeInput('SBI');

  const handleEntry = async () => {
    const formBo = {
      userId: auth.userId,
      source: source.val,
      amount: parseFloat(amt.val),
      date: new Date(date.val),
      comment: cmt.val,
      creditedTo: credit.val,
    };

    try {
      const res = await fetch('http://localhost:4500/api/income/incomeEntry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formBo),
      });

      if (res.ok) {
        const data = await res.json();
        alert("Income entry saved successfully!");
        console.log(data);
        setTrans(trans + 1);
      } else {
        throw new Error("Failed to save income entry");
      }
    } catch (err) {
      console.error(err);
      alert("Error while saving entry: " + err.message);
    }
  };

  return (
    <div className="expense-form">
      <input type="text" placeholder="Enter The Source" {...source.bind} />
      <input type="number" placeholder="Enter The Income Amount" {...amt.bind} />
      <input type="datetime-local" {...date.bind} />
      <input type="text" placeholder="Enter Comments" {...cmt.bind} />
      <select {...credit.bind}>
        {creditTo.map((val, key) => (
          <option value={val} key={key}>{val}</option>
        ))}
      </select>
      <button onClick={handleEntry}>Enter</button>
    </div>
  );
};

export default IncomeEntry;
