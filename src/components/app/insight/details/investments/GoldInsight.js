import React, { useEffect, useState } from 'react'
import { useTrans } from '../../../../context/TransactionContext';
import GoldCards from './GoldCards';
import '../investments/Gold.css'
import { useAuth } from '../../../../context/AuthContext';


function GoldInsight({ data }) {
    const [selector, setSelector] = useState({ Qty: 0, Amt: 0, Inv: 0, Data: [] })
    const [curr, setCurr] = useState();
    const { trans } = useTrans()
    const [market, setMarket] = useState({ sellValue: '', buyValue: '' });
    const { auth } = useAuth();


    const findInv = () => {

        let totalInv = 0;
        let totalMaketSellPrice = selector.Qty * curr;
        totalInv = totalMaketSellPrice - selector.Amt;

        return totalInv;
    }

    const dataProcessing = () => {
        const dataGold = data?.dataGold;
        if (!Array.isArray(dataGold)) return;

        let qtyTotal = 0;
        let amtTotal = 0;
        let invTotal = 0;

        dataGold.forEach(element => {
            qtyTotal += Number(element.qtyPurchased || 0);
            amtTotal += Number(element.purchaseAmount || 0);
        });

        const totalMaketSellPrice = qtyTotal * (curr || 0);
        const totalInv = totalMaketSellPrice - amtTotal;

        setSelector({
            Qty: qtyTotal,
            Amt: amtTotal,
            Inv: totalInv,
            Data: dataGold,
        });
    };

    useEffect(() => {
        dataProcessing();
    }, [])

    useEffect(() => {
        dataProcessing();
    }, [curr, trans, selector])


    const handleLog = async (e) => {
        e.preventDefault();
        const sendMarketData = {
            sellValue: Number(market.sellValue),
            buyValue: Number(market.buyValue),
            date: new Date().toISOString(),
            userId: auth.userId
        };
        const data = await fetch(`http://localhost:4500/api/sendMarket/gold/sendGold/${auth.userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendMarketData)
        })
        const jdata = await data.json();


    }



    return (
        <>
            <div className="gold">
                <div className='leftGold'>
                    <div className="gold-item"><p>Net Qty:</p><p>{selector.Qty}</p></div>
                    <div className="gold-item"><p>Net Amt:</p><p>{selector.Amt}</p></div>
                    <div className="gold-item"><p>Net Profit/Loss:</p><p>{selector.Inv}</p></div>
                    <label>Enter Current Sell PRICE To Know Your Profit/ Loss</label>
                    <input
                        placeholder="Enter Current Sell Price Of Gold"
                        name="curr"
                        value={curr}
                        onChange={(e) => setCurr(e.target.value)}
                    />
                </div>
                <div className='rightGold'>
                    <input name='sell' onChange={(e) => setMarket((prev) => ({ ...prev, sellValue: e.target.value }))} value={market.sellValue} placeholder='Log Current Sell Value' />
                    <input name='buy' onChange={(e) => setMarket((prev) => ({ ...prev, buyValue: e.target.value }))} value={market.buyValue} placeholder='Log Current Buy Value' />
                    <button onClick={handleLog}>Log</button>
                </div>
            </div>

            {/* <pre>{JSON.stringify(selector.Data)}</pre> */}
            <GoldCards data={selector.Data} />
        </>
    )
}

export default GoldInsight