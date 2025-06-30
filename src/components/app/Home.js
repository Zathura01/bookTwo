import React, { useEffect, useState } from 'react'
import DashCard from './dashboard/DashCard'
import ToolList from './tools/ToolList'
import News from './news/News'
import TransactionList from './transactions/TransactionList'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../app/Home.css'
import Navbar from './Navbar'




function Home() {

  const navigate = useNavigate();
  const { auth } = useAuth(); // Get token and userId from context
  const [nav, setNav] = useState(false)


  useEffect(() => {
    if (!auth.token) {
      // No token means not logged in
      navigate('/');
    }
    if (auth.token && auth.userId) {

    }
  }, [auth, navigate]);


  return (
    <>
      <div className='home'>
        <div className="navToggle">
          <button onClick={() => setNav(prev => !prev)}>☰</button>
        </div>

        <div className={`homeNav ${nav ? 'show' : 'hide'}`}>
          <Navbar />
        </div>
        <div className='left'>
          <TransactionList />
        </div>
        <div className='right'>
          <div className='top'>
            <dev className='dashSection'>
              <DashCard />
            </dev>
          </div>
          <div className='bottom'>
            <div className='leftBottom'>
              <News />
            </div>
            <div className='rightBottom'>
              <ToolList />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home