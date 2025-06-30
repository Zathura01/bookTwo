import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../dashboard/styleDash.css';
import InsightCard from '../insight/InsightCard';
import { useModal } from '../../context/ModalContext';

const COLORS = ['#FFD700', '#6A5ACD', '#FF6347', '#20B2AA', '#8B0000', '#6495ED'];

function Invest({ data }) {
  const { showModal } = useModal(); // ✅ moved here — unconditionally at the top

  if (!data) return null;

  const showInsight = () => {
    showModal(<InsightCard value={'invest'} />);
  };

  const chartData = [
    { name: 'Gold (₹)', value: data.gold || 0 },
    { name: 'Mutual Fund', value: data.mutualfund || 0 },
    { name: 'Fixed Rate Bond', value: data.fixedratebond || 0 },
    { name: 'Fixed Deposit', value: data.fixeddeposit || 0 },
    { name: 'Gold Bond', value: data.goldbond || 0 },
    { name: 'Real Estate', value: data.realestate || 0 },
  ].filter(item => item.value > 0);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Investment Dashboard</h2>      
        <button className="dashboard-button" onClick={showInsight}>
          Insight
        </button>
      </div>
      
      <div className="dashboard-flex">

        {/* LEFT TABLE */}
        <div className="dashboard-table-wrapper">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Investment Type</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.name}</td>
                  <td className="text-right">{entry.value.toLocaleString()}</td>
                </tr>
              ))}
              <tr className="dashboard-total-row">
                <td>Total</td>
                <td className="text-right">{data.TOTAL.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* RIGHT PIE CHART */}
        <div className="chart-container">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={50}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

export default Invest;
