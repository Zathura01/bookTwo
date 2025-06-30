import React, { useState, useEffect } from 'react';
import { useTrans } from '../../../context/TransactionContext';
import '../../insight/details/Showsave.css'



const baseBanks = { SBI: 0, AXIS: 0, IDBI: 0, MISC: 0 };

const monthsMap = {
  '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr',
  '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug',
  '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec'
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


function Showsave({ data }) {
  const [duration, setDuration] = useState('monthly');
  const [view, setView] = useState('');
  const [selector, setSelector] = useState([]);
  const { trans } = useTrans();
  const [giveView, setGiveView] = useState({})
  const yearMap = {}


  const dataProcessing = () => {
    const yearMap = {};

    data.forEach(entry => {
      const year = entry.date.slice(0, 4);
      const month = entry.date.slice(5, 7);
      const bank = entry.category;
      const amount = Number(entry.deposit || 0);

      // If year not seen yet, initialize fresh full month map
      if (!yearMap[year]) {
        yearMap[year] = getFreshYearMap();
      }

      if (yearMap[year][month] && yearMap[year][month][1][bank] !== undefined) {
        yearMap[year][month][1][bank] += amount;
      }
    });

    // Convert to array of [year, monthData]
    setSelector(Object.entries(yearMap).sort((a, b) => b[0] - a[0])); // sorted newest to oldest
  };


  useEffect(() => {
    if (data && data.length > 0) {
      dataProcessing();
      setGiveView(selector[0]?.[1] || {});
    }
  }, [data, trans]);

  useEffect(() => {
    console.log('📊 Final yearSelector:', selector);
    selector.forEach(element => {
      let ind = element[0];
      if (ind === view) {
        setGiveView(element[1]);
      }
    });
  }, [selector, view]);

  return (
    <div>
      <h4>Saving Insight Summary</h4>
      {/* <pre>{JSON.stringify(selector, null, 2)}</pre> */}
      <select value={view} onChange={(e) => setView(e.target.value)}>
        {
          selector.map((key, val) => (
            <option key={val} value={key[0]}>{key[0]}</option>
          ))
        }
      </select>
<table className="save-table">
  <thead>
    <tr>
      <th className="month-col">Month</th>
      <th colSpan="3" className="bank-header">SBI</th>
      <th colSpan="3" className="bank-header">AXIS</th>
      <th colSpan="3" className="bank-header">IDBI</th>
      <th colSpan="3" className="bank-header">MISC</th>
    </tr>
    <tr className="sub-header">
      <th></th>
      <th>Added</th><th>Total</th><th>%Inc</th>
      <th>Added</th><th>Total</th><th>%Inc</th>
      <th>Added</th><th>Total</th><th>%Inc</th>
      <th>Added</th><th>Total</th><th>%Inc</th>
    </tr>
  </thead>
  <tbody>
    {
      (() => {
        let runningTotals = { SBI: 0, AXIS: 0, IDBI: 0, MISC: 0 };
        return Object.entries(giveView).map(([key, val], ind) => {
          const monthName = val[0];
          const monthData = val[1];
          const current = { SBI: monthData.SBI, AXIS: monthData.AXIS, IDBI: monthData.IDBI, MISC: monthData.MISC };

          const row = ['SBI', 'AXIS', 'IDBI', 'MISC'].map(bank => {
            const added = current[bank];
            const oldTotal = runningTotals[bank];
            const newTotal = oldTotal + added;
            const percent = oldTotal === 0 ? '0.0' : ((added / Math.abs(oldTotal)) * 100).toFixed(1) + '';
            runningTotals[bank] = newTotal;
            return [added, newTotal, percent];
          });

          return (
            <tr key={ind}>
              <td className="month-name">{monthName}</td>
              <td className="added">{row[0][0]}</td><td className="total">{row[0][1]}</td><td className="percent">{row[0][2]}</td>
              <td className="added">{row[1][0]}</td><td className="total">{row[1][1]}</td><td className="percent">{row[1][2]}</td>
              <td className="added">{row[2][0]}</td><td className="total">{row[2][1]}</td><td className="percent">{row[2][2]}</td>
              <td className="added">{row[3][0]}</td><td className="total">{row[3][1]}</td><td className="percent">{row[3][2]}</td>
            </tr>
          );
        });
      })()
    }
  </tbody>
</table>


    </div>
  );
}

export default Showsave;
