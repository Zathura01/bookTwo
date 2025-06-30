import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useModal } from '../../context/ModalContext';
import InsightCard from '../insight/InsightCard';
import { useAuth } from '../../context/AuthContext';
import '../dashboard/styleDash.css';

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042',
  '#0660FE', '#00D19F', '#FFBC28', '#FF8422',
  '#0057FE', '#20C49F', '#FFAA28', '#FF8412'
];

function Expense({ data }) {
  const { auth } = useAuth(); // if unused, remove this line
  const { showModal } = useModal();

  if (!data) return null;

  const chartData = [
    { name: 'Food', value: data.Food || 0 },
    { name: 'Shelter', value: data.Shelter || 0 },
    { name: 'Gas', value: data.Gas || 0 },
    { name: 'Bike', value: data.Bike || 0 },
    { name: 'Stationary', value: data.Stationary || 0 },
    { name: 'Smoke', value: data.Smoke || 0 },
    { name: 'Shopping', value: data.Shopping || 0 },
    { name: 'Wine', value: data.Wine || 0 },
    { name: 'Washing', value: data.Washing || 0 },
    { name: 'Medicine', value: data.Medicine || 0 },
    { name: 'Jio', value: data.Jio || 0 },
    { name: 'Misc', value: data.Misc || 0 },
  ].filter(item => item.value > 0);

  const totalExpense = data.TOTAL || 0;

  const showInsight = () => {
    showModal(<InsightCard value="expense" />);
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h2>Expense Dashboard</h2>
        <button className="dashboard-button" onClick={showInsight}>
          Insight
        </button>
      </div>

      {/* Body */}
      <div className="dashboard-flex">
        {/* Table */}
        <div className="dashboard-table-wrapper">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Category</th>
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
                <td className="text-right">{totalExpense.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Chart */}
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

export default Expense;
