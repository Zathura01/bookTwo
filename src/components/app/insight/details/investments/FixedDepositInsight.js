import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { useTrans } from '../../../../context/TransactionContext';
import './FixedDeposit.css'; // import the CSS file

function FixedDepositInsight({ data }) {
  const { auth } = useAuth();
  const { trans } = useTrans();
  const [selector, setSelector] = useState([]);
  const [profit, setProfit] = useState({});

  const dataProcessing = () => {
    const dataFixedDeposit = data?.dataFixedDeposit || [];
    setSelector(dataFixedDeposit);

    let tempProfit = {};
    dataFixedDeposit.forEach((fd, index) => {
      const startDate = new Date(fd.createdAt);
      const endDate = new Date(fd.date);
      const timeInYears = (endDate - startDate) / (1000 * 60 * 60 * 24 * 365);

      const principal = Number(fd.deposit);
      const rate = Number(fd.interestRate);
      const interest = (principal * rate * timeInYears) / 100;
      tempProfit[index] = interest.toFixed(2);
    });

    setProfit(tempProfit);
  };

  useEffect(() => {
    dataProcessing();
  }, [trans]);

  return (
    <div className="fd-container">
      {selector.map((val, key) => (
        <div key={key} className="fd-card">
          <h3>{val.cmt || 'Unnamed FD'}</h3>
          <div className="fd-entry">
            <span>Interest Rate</span> <strong>{val.interestRate}%</strong>
          </div>
          <div className="fd-entry">
            <span>Initial Deposit</span> <strong>₹{val.deposit}</strong>
          </div>
          <div className="fd-entry">
            <span>Duration</span>
            <strong>{val.createdAt.slice(0, 10)} → {val.date.slice(0, 10)}</strong>
          </div>
          <div className="fd-entry">
            <span>Bank Source</span> <strong>{val.debit}</strong>
          </div>
          <div className="fd-entry profit">
            <span>Estimated Profit</span> <strong>₹{profit[key]}</strong>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FixedDepositInsight;
