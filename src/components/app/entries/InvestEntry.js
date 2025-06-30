import React from "react";
import TakeInput from "./TakeEntry";
import MutualFunds from "./investModals/MutualFunds";
import FixedDeposit from "./investModals/FixedDeposit";
import GoldFund from "./investModals/GoldFund";
import FixedInterestRateBond from "./investModals/FixedInterestRateBond";
import RealEstate from "./investModals/RealEstate";
import PPF from "./investModals/PPF";
import Gold from "./investModals/Gold";

import '../entries/cssfiles/Invest.css'



const investOptions = [
  { label: 'Gold', component: Gold },
  { label: 'Mutual Funds', component: MutualFunds },
  { label: 'Fixed Deposit', component: FixedDeposit },
  { label: 'Gold Fund', component: GoldFund },
  { label: 'Fixed Interest Rate Bond', component: FixedInterestRateBond },
  { label: 'PPF', component: PPF },
  { label: 'Real Estate', component: RealEstate }
];

const InvestEntry = () => {
  const cat = TakeInput('Gold');
  const SelectedComponent = investOptions.find(opt => opt.label === cat.val)?.component;

  return (
    <div className="invest-container">
      <label htmlFor="investment-select" className="invest-label">
        Select Investment Type:
      </label>

      <select
        id="investment-select"
        {...cat.bind}
        className="invest-select"
      >
        {investOptions.map((option, idx) => (
          <option key={idx} value={option.label}>
            {option.label}
          </option>
        ))}
      </select>

      <div className="invest-content">
        {SelectedComponent && <SelectedComponent />}
      </div>
    </div>
  );
};

export default InvestEntry;
