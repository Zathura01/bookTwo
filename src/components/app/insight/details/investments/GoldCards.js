import React from 'react';
import './Gold.css';

function GoldCards({ data }) {
  if (!Array.isArray(data)) return <p>No data available</p>;

  return (
    <div className="gold-cards-wrapper">
      {data.map((item, index) => (
        <div className="gold-card" key={item._id || index}>
          <div className="gold-card-header">
            <span className="gold-date">{new Date(item.date).toLocaleDateString()}</span>
            <span className="gold-debit">{item.debitFrom}</span>
          </div>
          <div className="gold-card-body">
            <p><strong>Qty Purchased:</strong> {item.qtyPurchased}</p>
            <p><strong>Purchase Amount:</strong> ₹{item.purchaseAmount}</p>
            <p><strong>Market Sell Amount:</strong> ₹{item.marketSellAmount}</p>
            {item.comment && <p><strong>Comment:</strong> {item.comment}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default GoldCards;
