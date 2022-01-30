import {useFirestoreDB} from '../../hooks/useFirestoreDB'
import './Home.css'

import React from 'react';

function TransactionList({transactions}) {

  // Fn from firestore hook
  const {deleteDocument } = useFirestoreDB('transactions')

  return <div>
      <ul className='transactions'>
        {transactions.map(t => (
            <li key={t.id}>
                <p className='name'>{t.transaction}</p>
                <p className='amount'>${t.amount}</p>
                <button onClick={()=> deleteDocument(t.id)}>X</button>
            </li>
        ))}
      </ul>
  </div>;
}

export default TransactionList;
