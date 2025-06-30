import React, { useEffect } from 'react';
import useInsightState from './InsightState';
import Showsave from './details/Showsave';
import { useTrans } from '../../context/TransactionContext';



function InsightSave() {
  const { callData, data, setUserData } = useInsightState('save');
  const { trans } = useTrans();

  useEffect(() => {
    callData();
  }, [trans]);

  return (
    <>
      <Showsave data={data} />
    </>
  );
}

export default InsightSave;
