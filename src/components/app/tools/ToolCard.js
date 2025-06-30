import React from 'react'
import { useModal } from '../../context/ModalContext'
import EntryModal from '../entries/EntryModal'
import TakeInput from '../entries/TakeEntry'
import '../../app/tools/Tool.css'



function ToolCard() {
  const { showModal } = useModal()
  const setContent = TakeInput(null)

  const handleOpen = (numb) => {
    setContent.setVal(numb)
    showModal(
      <EntryModal value={numb} setValue={setContent.setVal} />
    )
  }

  return (
    <>
      <button onClick={() => handleOpen(0)}>Income</button>
      <button onClick={() => handleOpen(1)}>Saving</button>
      <button onClick={() => handleOpen(2)}>Invest</button>
      <button onClick={() => handleOpen(3)}>Expense</button>
      <button onClick={()=> handleOpen(4)}>Withdrawal</button>
    </>
  )
}

export default ToolCard
