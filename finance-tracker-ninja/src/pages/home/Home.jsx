import React from 'react';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import useAuthContext from '../../hooks/useAuthContext'
import {useCollection} from '../../hooks/useCollection'
import './Home.css'

function Home() {

  // authContexts
  const {user} = useAuthContext()

  // state from the useCollection hook
  const query = ['uid', '==', user.uid]
  const orderBy = ['createdAt', 'desc']
  const {documents, error} = useCollection('transactions', query, orderBy)


  return( 
    <div className='container'>
      <div className='content'>
        {error && <p>{error}</p>}
        {documents && <TransactionList transactions={documents} />}
      </div>
      <div className='sidebar'>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
    )
}

export default Home;
