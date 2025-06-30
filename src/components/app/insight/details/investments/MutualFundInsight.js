import React, { useEffect, useState } from 'react';
import { useTrans } from '../../../../context/TransactionContext';
import './MutualFund.css';
import { useAuth } from '../../../../context/AuthContext';

function MutualFundInsight({ data }) {
  const [selector, setSelector] = useState({ LumpsumData: [], SIPData: [] });
  const { trans } = useTrans();
  const [choiceToSee, setChoiceToSee] = useState(true); // true = Lumpsum
  const { auth } = useAuth();

  const dataProcessing = () => {
    const dataMutualFund = data?.dataMutualFund || [];
    const lumpsum = [];
    const sip = [];

    dataMutualFund.forEach((item) => {
      if (item.planType === 'LUMPSUM') lumpsum.push(item);
      else sip.push(item);
    });

    setSelector({ LumpsumData: lumpsum, SIPData: sip });
  };

  useEffect(() => {
    dataProcessing();
  }, [trans]);

  useEffect(() => {
    console.log(selector);
  }, [selector]);

  return (
    <div className="mf-container">
      <div className="mf-toggle">
        <select
          onChange={(e) => setChoiceToSee(e.target.value === 'true')}
          value={choiceToSee.toString()}
        >
          <option value={true}>Lumpsum</option>
          <option value={false}>SIP</option>
        </select>
      </div>

      {choiceToSee ? (
        <LumpsumView data={selector.LumpsumData} userId={auth.userId} />
      ) : (
        <SipView data={selector.SIPData} userId={auth.userId} />
      )}
    </div>
  );
}

function LumpsumView({ data, userId }) {
  const [lumpsumVal, setLumpsumVal] = useState({});
  const [plvar, setPlver] = useState({});

  const handleLogLumpsum = async (key) => {
    const currentValue = lumpsumVal[key];
    const initialVal = data[key].purchaseAmount;
    const profitOrLoss = currentValue - initialVal;
    setPlver((prev) => ({ ...prev, [key]: profitOrLoss }));

    const logMf = {
      mutualFundId: data[key]._id,
      marketValue: lumpsumVal[key],
      date: new Date().toISOString(),
      userId: userId,
    };

    const dataToSend = await fetch(
      `http://localhost:4500/api/sendMarket/mutualfund/sendMutualFund/${userId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logMf),
      }
    );
    const jdata = await dataToSend.json();
  };

  return (
    <div className="mf-grid">
      {data.map((val, key) => (
        <div key={key} className="mf-card">
          <p><strong>Plan:</strong> {val.comment || 'Unnamed Plan'}</p>
          <p><strong>Amount:</strong> ₹{val.purchaseAmount}</p>
          <p><strong>Units:</strong> {val.unitsBought}</p>
          <p><strong>Unit Cost:</strong> ₹{val.unitCost}</p>
          <p><strong>Date:</strong> {val.date.slice(0, 10)}</p>
          <p><strong>Source:</strong> {val.debitFrom}</p>

          <input
            placeholder="Enter current value"
            value={lumpsumVal[key] || ''}
            onChange={(e) =>
              setLumpsumVal((prev) => ({
                ...prev,
                [key]: Number(e.target.value),
              }))
            }
          />
          <button onClick={() => handleLogLumpsum(key)}>Check P/L</button>
          {plvar[key]}
        </div>
      ))}
    </div>
  );
}

function SipView({ data, userId }) {
  const [sipVal, setSipVal] = useState({});
  const [plvar, setPlver] = useState({});

  const handleLogSip = async (key) => {
    const currentValue = sipVal[key];
    const initialVal = data[key].purchaseAmount;
    const profitOrLoss = currentValue - initialVal;
    setPlver((prev) => ({ ...prev, [key]: profitOrLoss }));

    const logMf = {
      mutualFundId: data[key]._id,
      marketValue: sipVal[key],
      date: new Date().toISOString(),
      userId: userId,
    };

    const dataToSend = await fetch(
      `http://localhost:4500/api/sendMarket/mutualfund/sendMutualFund/${userId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logMf),
      }
    );
    const jdata = await dataToSend.json();
  };

  return (
    <div className="mf-grid">
      {data.map((val, key) => (
        <div key={key} className="mf-card">
          <p><strong>Plan:</strong> {val.comment || 'Unnamed Plan'}</p>
          <p><strong>Amount:</strong> ₹{val.purchaseAmount}</p>
          <p><strong>Units:</strong> {val.unitsBought}</p>
          <p><strong>Unit Cost:</strong> ₹{val.unitCost}</p>
          <p><strong>Date:</strong> {val.date.slice(0, 10)}</p>
          <p><strong>Source:</strong> {val.debitFrom}</p>

          <input
            placeholder="Enter current value"
            value={sipVal[key] || ''}
            onChange={(e) =>
              setSipVal((prev) => ({
                ...prev,
                [key]: Number(e.target.value),
              }))
            }
          />
          <button onClick={() => handleLogSip(key)}>Check P/L</button>
          {plvar[key]}
        </div>
      ))}
    </div>
  );
}

export default MutualFundInsight;
