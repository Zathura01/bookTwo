import React from 'react'
import InsightExpense from './InsightExpense';
import InsightSave from './InsightSave';
import InsightInvest from './InsightInvest';

function InsightCard({value}) {
  
    const showrend=()=>{
        switch (value) {
            case 'save': return <InsightSave />
            case 'invest' : return <InsightInvest />
            case 'expense' : return <InsightExpense />
            default:
                break;
        }
    }
  
    return (
    <>
     { showrend() }
    </>
  )
}

export default InsightCard