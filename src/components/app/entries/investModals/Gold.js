import React from 'react';
import TakeInput from '../TakeEntry';
import DebitFrom from './DebitFrom';  // array like ['SBI', 'AXIS', ...]
import { useAuth } from '../../../context/AuthContext';
import { useTrans } from '../../../context/TransactionContext';
import '../cssfiles/Gold.css'



function Gold() {
  const { trans, setTrans } = useTrans();
  const { auth } = useAuth();

  const purchaseAmount = TakeInput(0);
  const marketSellAmount = TakeInput(0);
  const qtyPurchased = TakeInput(0);
  const date = TakeInput(new Date().toISOString().substring(0, 10)); // use date type, so just YYYY-MM-DD
  const cmt = TakeInput('');
  const debit = TakeInput('');

  const handleEntry = async () => {
    const data = {
      userId: auth.userId,
      purchaseAmount: parseFloat(purchaseAmount.val),
      marketSellAmount: parseFloat(marketSellAmount.val),
      qtyPurchased: parseFloat(qtyPurchased.val),
      date: new Date(date.val),
      comment: cmt.val,
      debitFrom: debit.val,
    };

    try {
      const res = await fetch('http://localhost:4500/api/invest/gold/Entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Error saving gold entry');
      }

      setTrans(trans + 1);
      alert('Gold entry saved successfully!');
    } catch (err) {
      alert('Failed to save: ' + err.message);
      console.error(err);
    }
  };

  return (
    <form className="gold-form" onSubmit={e => { e.preventDefault(); handleEntry(); }}>
      <label htmlFor="purchaseAmount">Purchased Amount</label>
      <input id="purchaseAmount" type="number" {...purchaseAmount.bind} min="0" step="any" />

      <label htmlFor="marketSellAmount">Market Sell Amount</label>
      <input id="marketSellAmount" type="number" {...marketSellAmount.bind} min="0" step="any" />

      <label htmlFor="qtyPurchased">Quantity Purchased</label>
      <input id="qtyPurchased" type="number" {...qtyPurchased.bind} min="0" step="any" />

      <label htmlFor="date">Date</label>
      <input id="date" type="date" {...date.bind} />

      <label htmlFor="comment">Comments</label>
      <input id="comment" type="text" {...cmt.bind} />

      <label htmlFor="debitFrom">Debit From</label>
      <select id="debitFrom" {...debit.bind} >
        <option value="">-- Select Debit From --</option>
        {DebitFrom.map((val, key) => (
          <option key={key} value={val}>{val}</option>
        ))}
      </select>

      <div className="gold-form-actions">
        <button type="submit">Enter</button>
      </div>
    </form>
  );
}

export default Gold;
