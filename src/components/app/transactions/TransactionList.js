// TransactionList.js
import React, { useEffect, useState } from 'react'
import { useTrans } from '../../context/TransactionContext'
import TransactionCard from './TransactionCard'
import { useAuth } from '../../context/AuthContext'
import './TransactionList.css'

function TransactionList() {
    const [trasact, setTrasact] = useState([])
    const { auth } = useAuth()
    const { trans, setTrans } = useTrans();

    const runFetch = async () => {
        const res = await fetch(`http://localhost:4500/api/trasact/getAllTransactions/${auth.userId}`)
        const jdata = await res.json()
        if (jdata) setTrasact(jdata)
    }

    const handleDelete = async (id) => {
        const res = await fetch(`http://localhost:4500/api/trasact/deleteTransaction/${id}`, {
            method: 'DELETE',
        })
        if (res.ok) {
            setTrasact(prev => prev.filter(t => t._id !== id))
            setTrans(trans + 1)
        }else{
            const data = await res.json();
            console.log('Status:', res.status, 'Response:', data);
        }
    }


    useEffect(() => {
        runFetch()
    }, [trans])

    return (
        <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3>Transaction List</h3>
            {trasact.map((val, ind) => (
                <TransactionCard
                    key={ind}
                    data={val}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );

}

export default TransactionList
