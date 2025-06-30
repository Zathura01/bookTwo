import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useModal } from '../../context/ModalContext';
import InsightCard from '../insight/InsightCard';
import { useAuth } from '../../context/AuthContext';
import '../dashboard/styleDash.css';

const COLORS = ['#4e79a7', '#f28e2c', '#e15759', '#76b7b2'];

function Save({ data }) {
  const { auth } = useAuth();
  const { showModal } = useModal();

  const showInsight = () => {
    showModal(<InsightCard value={'save'} />);
  };

  if (!data) return null;

  const chartData = [
    { name: 'SBI', value: data.SBI || 0 },
    { name: 'AXIS', value: data.AXIS || 0 },
    { name: 'IDBI', value: data.IDBI || 0 },
    { name: 'MISC', value: data.MISC || 0 },
  ].filter(item => item.value > 0);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Savings Dashboard</h2>
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
                <th>Bank</th>
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

export default Save;
