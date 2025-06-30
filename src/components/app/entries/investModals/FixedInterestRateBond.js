import React from 'react';
import TakeInput from '../TakeEntry';
import DebitFrom from './DebitFrom';
import { useAuth } from '../../../context/AuthContext';
import { useTrans } from '../../../context/TransactionContext';

import '../cssfiles/Firb.css'



function FixedInterestRateBond() {
  const { trans, setTrans } = useTrans();
  const { auth } = useAuth();

  const period = TakeInput(0);
  const deposit = TakeInput(0);
  const interestAtStart = TakeInput(0);
  const date = TakeInput(new Date().toISOString().substring(0, 16));
  const cmt = TakeInput('');
  const debit = TakeInput('');

  const handleEntry = async () => {
    if (!debit.val) {
      alert("Please select a debit account.");
      return;
    }

    const body = {
      userId: auth.userId,
      period: parseFloat(period.val),
      deposit: parseFloat(deposit.val),
      interestAtStart: parseFloat(interestAtStart.val),
      date: new Date(date.val),
      cmt: cmt.val,
      debit: debit.val,
    };

    try {
      const res = await fetch(
        'http://localhost:4500/api/invest/fixedinterestratebond/fibentry',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert('Entry saved successfully!');
        setTrans(trans + 1);
      } else {
        alert('Save failed: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      console.error('Error saving entry:', err);
      alert('Error saving entry.');
    }
  };

  return (
    <form
      className="fib-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleEntry();
      }}
    >
      <div className="fib-row">
        <label htmlFor="period">Bond Period (years)</label>
        <input
          id="period"
          type="number"
          min="0"
          {...period.bind}
          required
          className="fib-input"
          placeholder="Enter bond period"
        />
      </div>

      <div className="fib-row">
        <label htmlFor="deposit">Deposit Amount</label>
        <input
          id="deposit"
          type="number"
          min="0"
          {...deposit.bind}
          required
          className="fib-input"
          placeholder="Enter deposit amount"
        />
      </div>

      <div className="fib-row">
        <label htmlFor="interestAtStart">Initial Interest Rate (%)</label>
        <input
          id="interestAtStart"
          type="number"
          min="0"
          step="0.01"
          {...interestAtStart.bind}
          required
          className="fib-input"
          placeholder="Enter initial interest rate"
        />
      </div>

      <div className="fib-row">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="datetime-local"
          {...date.bind}
          required
          className="fib-input"
        />
      </div>

      <div className="fib-row">
        <label htmlFor="comment">Comment</label>
        <input
          id="comment"
          type="text"
          {...cmt.bind}
          className="fib-input"
          placeholder="Optional"
        />
      </div>

      <div className="fib-row">
        <label htmlFor="debit">Debit From</label>
        <select
          id="debit"
          {...debit.bind}
          required
          className="fib-select"
        >
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

      <div className="fib-row fib-actions">
        <button type="submit" className="fib-button">
          Submit
        </button>
      </div>
    </form>
  );
}

export default FixedInterestRateBond;
