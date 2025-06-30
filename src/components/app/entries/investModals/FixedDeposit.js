import React from 'react';
import TakeInput from '../TakeEntry';
import DebitFrom from './DebitFrom';
import { useAuth } from '../../../context/AuthContext';
import { useTrans } from '../../../context/TransactionContext';

import '../cssfiles/Fd.css'

function FixedDeposit() {
  const { trans, setTrans } = useTrans();
  const { auth } = useAuth();

  const deposit = TakeInput(0);
  const interestRate = TakeInput(0);
  const date = TakeInput(new Date().toISOString().substring(0, 10));
  const cmt = TakeInput('');
  const debit = TakeInput('');

  const handleEntry = async () => {
    if (!debit.val) {
      alert("Please select a debit account.");
      return;
    }
    try {
      const res = await fetch('http://localhost:4500/api/invest/fixeddeposit/fdentry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: auth.userId,
          deposit: Number(deposit.val),
          interestRate: Number(interestRate.val),
          date: new Date(date.val),
          cmt: cmt.val,
          debit: debit.val,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Fixed Deposit saved successfully!");
        setTrans(trans + 1);
      } else {
        alert("Save failed: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      alert("Something went wrong");
      console.error(error);
    }
  };

  return (
    <form className="fd-form" onSubmit={(e) => { e.preventDefault(); handleEntry(); }}>
      <div className="fd-row">
        <label htmlFor="deposit">Deposit Amount</label>
        <input
          id="deposit"
          type="number"
          min="0"
          {...deposit.bind}
          required
          className="fd-input"
          placeholder="Enter deposit amount"
        />
      </div>

      <div className="fd-row">
        <label htmlFor="interestRate">Interest Rate (%)</label>
        <input
          id="interestRate"
          type="number"
          min="0"
          step="0.01"
          {...interestRate.bind}
          required
          className="fd-input"
          placeholder="Enter interest rate"
        />
      </div>

      <div className="fd-row">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          {...date.bind}
          required
          className="fd-input"
        />
      </div>

      <div className="fd-row">
        <label htmlFor="comment">Comment</label>
        <input
          id="comment"
          type="text"
          {...cmt.bind}
          className="fd-input"
          placeholder="Optional"
        />
      </div>

      <div className="fd-row">
        <label htmlFor="debit">Debit From</label>
        <select id="debit" {...debit.bind} required className="fd-select">
          <option value="" disabled>
            -- Select Debit Account --
          </option>
          {DebitFrom.map((val, key) => (
            <option key={key} value={val}>
              {val}
            </option>
          ))}
        </select>
      </div>

      <div className="fd-row fd-actions">
        <button type="submit" className="fd-button">Enter</button>
      </div>
    </form>
  );
}

export default FixedDeposit;
