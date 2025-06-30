import React from 'react';
import TakeInput from './TakeEntry';
import { useAuth } from '../../context/AuthContext';
import { useTrans } from '../../context/TransactionContext';
import '../entries/cssfiles/Save.css'

const catSave = ['SBI', 'AXIS', 'IDBI'];

function SaveEntry() {
  const { trans, setTrans } = useTrans();
  const { auth } = useAuth();

  const category = TakeInput('SBI');
  const deposit = TakeInput(0);
  const date = TakeInput(new Date().toISOString().substring(0, 10));
  const cmt = TakeInput('');

  const handleEntry = async () => {
    if (!auth?.userId || !auth?.token) {
      alert("You're not logged in.");
      return;
    }

    try {
      const res = await fetch('http://localhost:4500/api/transaction/saveThis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({
          userId: auth.userId,
          category: category.val,
          deposit: parseFloat(deposit.val),
          date: new Date(date.val),
          comment: cmt.val,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || 'Failed to save entry');
        return;
      }

      alert('Entry saved successfully!');
      setTrans(trans + 1);
    } catch (err) {
      console.error('Save error:', err);
      alert('Something went wrong');
    }
  };

  return (
    <div className="entry-form">
      <select {...category.bind}>
        {catSave.map((val, ind) => (
          <option value={val} key={ind}>{val}</option>
        ))}
      </select>

      <input type="number" {...deposit.bind} placeholder="Amount" />
      <input type="date" {...date.bind} />
      <input type="text" {...cmt.bind} placeholder="Comment" />

      <button onClick={handleEntry}>Save</button>
    </div>
  );
}

export default SaveEntry;
