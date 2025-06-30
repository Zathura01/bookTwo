import React, { useState, useEffect } from 'react'
import GoldInsight from './investments/GoldInsight';
import MutualFundInsight from './investments/MutualFundInsight';
import FixedDepositInsight from './investments/FixedDepositInsight';
import BondInsight from './investments/BondInsight';

function Showinvest({data}) {

    const [ click, setClick] = useState(1);
    const [ view, setView] = useState({
        Gold: true, MutualFund: false, FixedDeposit: false, Bond: false
    })


    const handleFrontView=()=>{
        switch (click) {
            case 1:
            setView({Gold: true, MutualFund: false, FixedDeposit: false, Bond: false})    
            break;
            case 2:
            setView({Gold: false, MutualFund: true, FixedDeposit: false, Bond: false})    
            break;
            case 3:
            setView({Gold: false, MutualFund: false, FixedDeposit: true, Bond: false})    
            break;
            case 4:
            setView({Gold: false, MutualFund: false, FixedDeposit: false, Bond: true}) 
            break;
        
            default:
                break;
        }
    }

    useEffect(() => {
      handleFrontView();
    }, [click])
    

  return (
  <>
  {/* { <pre>{JSON.stringify(data, null, 2)}</pre> } */}
  <button onClick={(e)=>setClick(1)}>Gold</button>
    <button onClick={(e)=>setClick(2)}>MutualFund</button>
  <button onClick={(e)=>setClick(3)}>FixedDeposit</button>
  <button onClick={(e)=>setClick(4)}>FixedRateBond</button>

{
    ( view.Gold && <GoldInsight data={data} /> ) || ( view.MutualFund && <MutualFundInsight data={data} /> ) || ( view.FixedDeposit && <FixedDepositInsight data={data} /> ) || ( view.Bond && <BondInsight data={data} /> )
}

  </>  
  )


}

export default Showinvest