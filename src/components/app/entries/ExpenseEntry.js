import React from 'react'
import TakeInput from './TakeEntry'
import { useAuth } from '../../context/AuthContext'
import { useTrans } from '../../context/TransactionContext';
import '../entries/cssfiles/Expense.css'





const expCat = {
  Food: [
    'Biscuit', 'Bread', 'Biryani', 'Buttermilk', 'Cake', 'Chips', 'Chocolate', 'Coffee',
    'Doughnut', 'Egg', 'Milk', 'Misc', 'Noodles', 'Paneer', 'Pickle', 'Pulses',
    'Rice', 'Soda', 'Souce', 'Spices', 'Sugar', 'Toast', 'Wheat'
  ],
  Shelter: [],
  Gas: [],
  Bike: [],
  Stationary: [],
  Smoke: [],
  Shopping: [],
  Washing: [],
  Wine: [],
  Medicine: [],
  Jio: ['Cell', 'Wifi'],
  Misc: []
}

const deb = ['SBI', 'AXIS', 'IDBI', 'MISC']

function ExpenseEntry() {
      const { trans, setTrans } = useTrans();
    
  const { auth } = useAuth();
  const category = TakeInput('Food')
  const subcategory = TakeInput('Biscuit')
  const amt = TakeInput(0)
  const date = TakeInput(new Date().toISOString().substring(0, 16))
  const cmt = TakeInput('')
  const debit = TakeInput('SBI')

  const handleEntry = async () => {
    const entry = {
      userId: auth.userId,
      category: category.val,
      subcategory: subcategory.val,
      amount: Number(amt.val),
      date: new Date(date.val),
      comment: cmt.val,
      debitedFrom: debit.val
    }

    try {

      const response = await fetch('http://localhost:4500/api/expense/addExpense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`
        },
        body: JSON.stringify(entry)
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.message || 'Failed to save')
      }

      alert('Expense saved successfully!')
              setTrans(trans+1);

    } catch (error) {
      console.error('Error:', error)
      alert('Failed to save expense')
    }
  }

  return (
  <div className="expense-form">
    <select {...category.bind}>
      {Object.keys(expCat).map((cat, ind) => (
        <option key={ind} value={cat}>{cat}</option>
      ))}
    </select>

    {expCat[category.val]?.length > 0 && (
      <select {...subcategory.bind}>
        {expCat[category.val].map((item, i) => (
          <option key={i} value={item}>{item}</option>
        ))}
      </select>
    )}

    <input type="number" {...amt.bind} placeholder="Enter Expense Amount" />
    <input type="datetime-local" {...date.bind} />
    <input type="text" {...cmt.bind} placeholder="Enter Comment" />

    <select {...debit.bind}>
      {deb.map((val, key) => (
        <option value={val} key={key}>{val}</option>
      ))}
    </select>

    <button onClick={handleEntry}>Enter</button>
  </div>
);
}

export default ExpenseEntry
