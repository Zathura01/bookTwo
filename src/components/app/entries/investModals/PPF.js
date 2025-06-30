import React from 'react'
import TakeInput from '../TakeEntry'
import DebitFrom from './DebitFrom'


function PPF() {

    const period = TakeInput(0)
    const deposit = TakeInput(0)
    const interestRate = TakeInput(0)
    const date = TakeInput(new Date().toISOString().substring(0, 16))
    const cmt = TakeInput('')
    const debit = TakeInput('')
const handleEntry = () =>{
    }
    

    return (
        <>
            <input placeholder='Enter Period' type='number' {...period.bind} />
            <input placeholder='Enter Deposit Amount' type='number' {...deposit.bind} />
            <input placeholder='Enter Interest Rate' type='number' {...interestRate.bind} />
            <input placeholder='Select Date' type='date' {...date.bind} />
            <input placeholder='Enter Comment' typeof='text' {...cmt.bind} />
            <select {...debit.bind}>
                {
                    DebitFrom.map((val, key) => {
                        return (
                            <>
                                <option key={key} value={val}>{val}</option>
                            </>
                        )
                    })
                }
            </select>
            <button onClick={handleEntry} >Entry</button>

        </>
    )
}

export default PPF
