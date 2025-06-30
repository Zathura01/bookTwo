import React from 'react'
import SaveEntry from './SaveEntry'
import InvestEntry from './InvestEntry'
import IncomeEntry from './IncomeEntry'
import ExpenseEntry from './ExpenseEntry'
import WithdrawalEntry from './WithdrawalEntry'
// import '../entries/cssfiles/Modal.css'


function EntryModal({ value, setValue }) {

    const showRender = () => {
        switch (value) {
            case 0: return <IncomeEntry />;
            case 1: return <SaveEntry />;
            case 2: return <InvestEntry />;
            case 3: return <ExpenseEntry />;
            case 4: return <WithdrawalEntry />
            default: return <div>Select something</div>;
        }
    }

    return (
        <div className='modalPage'>
            {showRender()}
        </div>
    )
}

export default EntryModal
