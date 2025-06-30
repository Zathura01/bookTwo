import React from 'react'
import TakeInput from '../TakeEntry'
import DebitFrom from './DebitFrom'
import { useTrans } from '../../../context/TransactionContext'

function GoldFund() {
  const { trans, setTrans } = useTrans()

  const deposit = TakeInput(0)
  const date = TakeInput(new Date().toISOString().substring(0, 10)) // 'yyyy-mm-dd' format for date input
  const cmt = TakeInput('')
  const debit = TakeInput('')

  const handleEntry = () => {
    // Your entry logic here
    alert('Entry clicked')
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        handleEntry()
      }}
      style={{
        maxWidth: '480px',
        margin: '40px auto',
        padding: '25px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}
    >
      <h2 style={{ marginBottom: '20px', color: '#004080' }}>Gold Fund Entry</h2>

      <div style={{ display: 'flex', marginBottom: '18px', alignItems: 'center' }}>
        <label
          htmlFor="deposit"
          style={{ width: '140px', fontWeight: '600', color: '#333' }}
        >
          Deposit Amount:
        </label>
        <input
          id="deposit"
          type="number"
          placeholder="Enter Deposit Amount"
          {...deposit.bind}
          style={{
            flex: 1,
            padding: '10px 12px',
            borderRadius: '6px',
            border: '1.5px solid #888',
            fontSize: '15px',
            outline: 'none',
          }}
          min="0"
          step="any"
        />
      </div>

      <div style={{ display: 'flex', marginBottom: '18px', alignItems: 'center' }}>
        <label
          htmlFor="date"
          style={{ width: '140px', fontWeight: '600', color: '#333' }}
        >
          Date:
        </label>
        <input
          id="date"
          type="date"
          {...date.bind}
          style={{
            flex: 1,
            padding: '10px 12px',
            borderRadius: '6px',
            border: '1.5px solid #888',
            fontSize: '15px',
            outline: 'none',
          }}
        />
      </div>

      <div style={{ display: 'flex', marginBottom: '18px', alignItems: 'center' }}>
        <label
          htmlFor="comment"
          style={{ width: '140px', fontWeight: '600', color: '#333' }}
        >
          Comment:
        </label>
        <input
          id="comment"
          type="text"
          placeholder="Enter Comment"
          {...cmt.bind}
          style={{
            flex: 1,
            padding: '10px 12px',
            borderRadius: '6px',
            border: '1.5px solid #888',
            fontSize: '15px',
            outline: 'none',
          }}
        />
      </div>

      <div style={{ display: 'flex', marginBottom: '25px', alignItems: 'center' }}>
        <label
          htmlFor="debit"
          style={{ width: '140px', fontWeight: '600', color: '#333' }}
        >
          Debit From:
        </label>
        <select
          id="debit"
          {...debit.bind}
          style={{
            flex: 1,
            padding: '10px 12px',
            borderRadius: '6px',
            border: '1.5px solid #888',
            fontSize: '15px',
            outline: 'none',
            backgroundColor: '#fff',
            cursor: 'pointer'
          }}
          defaultValue=""
        >
          <option value="" disabled>
            -- Select Debit From --
          </option>
          {DebitFrom.map((val, key) => (
            <option key={key} value={val}>
              {val}
            </option>
          ))}
        </select>
      </div>

      <div style={{ textAlign: 'right' }}>
        <button
          type="submit"
          style={{
            backgroundColor: '#004080',
            color: 'white',
            border: 'none',
            padding: '12px 28px',
            borderRadius: '7px',
            fontSize: '16px',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(0,64,128,0.3)',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={e => (e.currentTarget.style.backgroundColor = '#003366')}
          onMouseOut={e => (e.currentTarget.style.backgroundColor = '#004080')}
        >
          Entry
        </button>
      </div>
    </form>
  )
}

export default GoldFund
