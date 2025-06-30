import React from 'react'
import TakeInput from '../TakeEntry'
import DebitFrom from './DebitFrom'
import { useAuth } from '../../../context/AuthContext'
import { useTrans } from '../../../context/TransactionContext';



function MutualFunds() {
      const { trans, setTrans } = useTrans();
    
    const planType = TakeInput('LUMPSUM')
    const purchaseAmount = TakeInput(0)
    const unitsBought = TakeInput(0)
    const unitCost = TakeInput(0)
    const date = TakeInput(new Date().toISOString().substring(0, 16))
    const cmt = TakeInput('')
    const debit = TakeInput('')
    const { auth } = useAuth()

    const handleEntry = async () => {
        
        const data = {
            userId: auth.userId,
            planType: planType.val,
            purchaseAmount: parseFloat(purchaseAmount.val),
            unitsBought: parseFloat(unitsBought.val),
            unitCost: parseFloat(unitCost.val),
            date: new Date(date.val),
            comment: cmt.val,
            debitFrom: debit.val
        }

        console.log(data)

        try {
            const res = await fetch('http://localhost:4500/api/invest/mutualfund/mfentry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!res.ok) {
                const err = await res.json()
                throw new Error(err.error || 'Failed to save mutual fund entry')
            }
        setTrans(trans+1);

            alert('Mutual Fund entry saved successfully!')
        } catch (err) {
            console.error(err)
            alert('Error: ' + err.message)
        }
    }

    return (
        <>
            <label>Plan Type</label>
            <select {...planType.bind}>
                <option value="LUMPSUM">Lumpsum</option>
                <option value="SIP">SIP</option>
            </select>

            <input
                type="number"
                placeholder="Purchase Amount"
                {...purchaseAmount.bind}
            />

            <input
                type="number"
                placeholder="Units Bought"
                {...unitsBought.bind}
            />

            <input
                type="number"
                placeholder="Unit Cost"
                {...unitCost.bind}
            />

            <input
                type="datetime-local"
                {...date.bind}
            />

            <input
                type="text"
                placeholder="Comments (optional)"
                {...cmt.bind}
            />

            <select {...debit.bind}>
                <option value="">-- Select Debit From --</option>
                {DebitFrom.map((val, key) => (
                    <option key={key} value={val}>{val}</option>
                ))}
            </select>

            <button onClick={handleEntry}>Enter</button>
        </>
    )
}

export default MutualFunds
