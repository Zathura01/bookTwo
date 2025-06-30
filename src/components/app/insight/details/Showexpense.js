import React, { useState, useEffect } from 'react';
import { useTrans } from '../../../context/TransactionContext';
import './Showexpense.css'; // Make sure you import your CSS here

const baseBanks = {
  Food: 0, Shelter: 0, Gas: 0, Bike: 0,
  Stationary: 0, Smoke: 0, Shopping: 0,
  Washing: 0, Wine: 0, Medicine: 0,
  Jio: 0, Misc: 0
};

function getFreshYearMap() {
  const monthObj = {};
  for (let i = 1; i <= 12; i++) {
    const num = i.toString().padStart(2, '0');
    const name = new Date(2000, i - 1).toLocaleString('en-US', { month: 'short' });
    monthObj[num] = [name, { ...baseBanks }];
  }
  return monthObj;
}

function Showexpense({ data }) {
  const [view, setView] = useState('');
  const [selector, setSelector] = useState([]);
  const [giveView, setGiveView] = useState({});
  const { trans } = useTrans();
  const [duration, setDuration] = useState('monthly');

  const dataProcessing = () => {
    const yearMap = {};
    data.forEach(entry => {
      const year = entry.date.slice(0, 4);
      const month = entry.date.slice(5, 7);
      const bank = entry.category;
      const amount = Number(entry.amount || 0);
      if (!yearMap[year]) yearMap[year] = getFreshYearMap();
      if (yearMap[year][month]?.[1]?.[bank] !== undefined) {
        yearMap[year][month][1][bank] += amount;
      }
    });
    const result = Object.entries(yearMap).sort((a, b) => b[0] - a[0]);
    setSelector(result);
  };

  useEffect(() => {
    if (data?.length) dataProcessing();
  }, [data, trans]);

  useEffect(() => {
    const match = selector.find(([key]) => key === view);
    if (match) setGiveView(match[1]);
  }, [selector, view]);

  return (
    <div className="expense-summary-container">
      <h4 className="summary-title">Expense Insight Summary</h4>

      <div className="summary-controls">
        <label>
          Year:
          <select value={view} onChange={(e) => setView(e.target.value)}>
            {
              selector.map(([key], idx) => (
                <option key={idx} value={key}>{key}</option>
              ))
            }
          </select>
        </label>

        <label>
          View:
          <select value={duration} onChange={(e) => setDuration(e.target.value)}>
            <option value='monthly'>Monthly</option>
            <option value='quarterly'>Quarterly</option>
            <option value='yearly'>Yearly</option>
          </select>
        </label>
      </div>

      <div className="table-wrapper">
        <table className="expense-table">
          <thead>
            <tr>
              <th>Month</th>
              {
                Object.keys(baseBanks).map((val, ind) => (
                  <th key={ind} colSpan="2">{val}</th>
                ))
              }
              <th>Total</th>
            </tr>
            <tr>
              <td></td>
              {
                Object.keys(baseBanks).map((_, ind) => (
                  <React.Fragment key={ind}>
                    <td>Amt</td>
                    <td>%</td>
                  </React.Fragment>
                ))
              }
              <td></td>
            </tr>
          </thead>
          <tbody>
            {
              Object.entries(giveView).map(([monthKey, val], index) => {
                const monthName = val[0];
                const monthData = val[1];
                const total = Object.values(monthData).reduce((sum, curr) => sum + curr, 0);

                return (
                  <tr key={index}>
                    <td className="month-name">{monthName}</td>
                    {
                      Object.keys(baseBanks).map((bank, i) => {
                        const amount = monthData[bank];
                        const percent = total === 0 ? '0.0%' : ((amount / total) * 100).toFixed(1) + '%';
                        return (
                          <React.Fragment key={i}>
                            <td>{amount}</td>
                            <td>{percent}</td>
                          </React.Fragment>
                        );
                      })
                    }
                    <td className="total-cell">{total}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Showexpense;
