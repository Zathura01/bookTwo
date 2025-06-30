// TransactionCard.js
import React from 'react';
import './TransactionCard.css';

function TransactionCard({ data, onDelete }) {
  const { type, amt, desc, cmt, _id, date } = data;

  return (
    <div className="transaction-card">
      <div className="transaction-content">
        <p><strong>Type:</strong> {desc}</p>
        <p><strong>Amount:</strong> ₹{amt}</p>
        <p><strong>Description:</strong> {type}</p>
<p><strong>Comment:</strong> {cmt ? (String(cmt).length > 20 ? String(cmt).slice(0, 20) + '...' : String(cmt)) : "—"}</p>
        <p><strong>Date:</strong> {new Date(date).toLocaleString()}</p>
      </div>
      <div className="transaction-buttons">
        <button className="delete-btn" onClick={() => onDelete(_id)}>Delete</button>
      </div>
    </div>
  );
}

export default TransactionCard;
