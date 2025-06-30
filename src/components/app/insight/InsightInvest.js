import React, { useEffect } from 'react';
import useInsightState from './InsightState';
import Showinvest from './details/Showinvest';

function InsightInvest() {
  const { callData, data } = useInsightState('invest');

  useEffect(() => {
    callData();
  }, [callData]);

  return (
    <>
      {data ? (
        // <pre>{JSON.stringify(data, null, 2)}</pre>
        <Showinvest data={data}/>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default InsightInvest