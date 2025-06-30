import React, { useEffect } from 'react';
import useInsightState from './InsightState';
import Showexpense from './details/Showexpense';

function InsightExpense() {
  const { callData, data } = useInsightState('expense');

  useEffect(() => {
    callData();
  }, [callData]);

  return (
    <>
      {data ? (
        // <pre>{JSON.stringify(data, null, 2)}</pre>
        <Showexpense data={data}/>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default InsightExpense