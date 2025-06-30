import React from 'react';
import TakeInput from "./TakeEntry";
import { useAuth } from '../../context/AuthContext';
import { useTrans } from '../../context/TransactionContext';
import '../entries/cssfiles/Expense.css'



const creditTo = ['SBI', 'AXIS', 'IDBI', 'MISC', 'PHYSICAL'];

const debitFrom = {
  SAVE: ['SBI', 'AXIS', 'IDBI', 'MISC'],
  INVEST: ['FIXEDDEPOSIT', 'FIXEDINTERESTBOND', 'GOLD', 'GOLDBOND', 'LAND', 'MUTUALFUND', 'PPF'],
  MISC: ['CASH', 'GIFT', 'OTHER']
};

function WithdrawalEntry() {
  const { trans, setTrans } = useTrans();
  const { auth } = useAuth();

  const amt = TakeInput(0);
  const date = TakeInput(new Date().toISOString().substring(0, 16));
  const cmt = TakeInput('');
  const credit = TakeInput('');
  const debit = TakeInput('');

  const handleEntry = async () => {
    const data = {
      userId: auth.userId,
      amount: parseFloat(amt.val),
      date: new Date(date.val),
      comment: cmt.val,
      creditTo: credit.val,
      debitFrom: debit.val
    };

    try {
      const res = await fetch('http://localhost:4500/api/withdrawal/withdrawalEntry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        const json = await res.json();
        alert("Withdrawal saved successfully!");
        console.log(json);
        setTrans(trans + 1);
      } else {
        const err = await res.json();
        throw new Error(err.error || "Something went wrong.");
      }
    } catch (err) {
      alert("Error saving withdrawal: " + err.message);
      console.error(err);
    }
  };

  return (
    <div className="expense-form">
      <input type="number" placeholder="Enter Amount To Be Withdrawed" {...amt.bind} />
      <input type="datetime-local" placeholder="Select Date" {...date.bind} />
      <input type="text" placeholder="Enter Comments" {...cmt.bind} />

      <select {...credit.bind}>
        <option value="">-- Select Credit To --</option>
        {creditTo.map((item, index) => (
          <option key={index} value={item}>{item}</option>
        ))}
      </select>

      <select {...debit.bind}>
        <option value="">-- Select Debit From --</option>
        {Object.entries(debitFrom).map(([group, options]) => (
          <optgroup label={group} key={group}>
            {options.map((opt, idx) => (
              <option key={idx} value={opt}>{opt}</option>
            ))}
          </optgroup>
        ))}
      </select>

      <button onClick={handleEntry}>Enter</button>
    </div>
  );
}

export default WithdrawalEntry;
