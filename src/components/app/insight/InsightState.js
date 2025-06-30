import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTrans } from '../../context/TransactionContext';

const useInsightState = (cat) => {
  const [data, setData] = useState([]);
  const { auth } = useAuth();
  const { setTrans } = useTrans()


  const callData = async () => {
    try {
      const res = await fetch(`http://localhost:4500/api/getInsight/${cat}/${auth.userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: auth.userId })
      });
      const jdata = await res.json();
      setData(jdata);
    } catch (error) { 
      console.error("Error fetching insight data:", error);
    }
  };

  const setUserData = (val) => {
    console.log(auth.userId, ' ocing form insdie')
    setData(val);
    
  };

  return {
    data,
    callData,
    setUserData
  };
};

export default useInsightState;
