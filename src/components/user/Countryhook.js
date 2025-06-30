import React, { useState } from 'react';

function Countryhook({ setCountry }) {
  const [selected, setSelected] = useState('');

  const countries = [
    { name: "USA", currency: "USD ($)" },
    { name: "India", currency: "INR (₹)" },
    { name: "China", currency: "CNY (¥)" },
    { name: "Japan", currency: "JPY (¥)" },
    { name: "South Korea", currency: "KRW (₩)" },
    { name: "UK", currency: "GBP (£)" },
    { name: "Eurozone", currency: "EUR (€)" },
    { name: "Russia", currency: "RUB (₽)" }
  ];

  const handleChange = (e) => {
    const val = JSON.parse(e.target.value);
    setCountry(val.currency)
  };

  return (
    <>
      <label>Select Country & Currency:</label>
      <select value={selected} onChange={handleChange}>
        <option value="">-- Select --</option>
        {countries.map((item, index) => (
          <option key={index} value={JSON.stringify(item)}>
            {item.name} - {item.currency}
          </option>
        ))}
      </select>
    </>
  );
}

export default Countryhook;
