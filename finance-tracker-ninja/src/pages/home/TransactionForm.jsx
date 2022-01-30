import React, {useState, useEffect} from 'react';
import { useFirestoreDB } from '../../hooks/useFirestoreDB';
import './Home.css'

function TransactionForm({uid}) {
  
  // useState
  const [transactionName, setTransactionName] = useState('')
  const [amount, setAmount] = useState('')

  // state from a reducer in a hook
  const {addDocument, response} = useFirestoreDB('transactions')


  const handleSubmit = (e) => {
      e.preventDefault()
      addDocument({
          uid,
          'transaction': transactionName,
          amount
        });
  }

  // listener to clear form after successful submission to the firestore DB
  useEffect(()=> {
    if(response.success){
      setTransactionName('')
      setAmount('')
    }
  },[response.success])

  
  return <>
      <h3>Add a Transaction</h3>
      <form onSubmit={handleSubmit}>
          <label htmlFor='transaction-name'><span>Transaction: </span></label>
          <input id='transaction-name' 
                 type='text'
                 name='transaction-name'
                 value={transactionName}
                 required
                 onChange={(e)=> setTransactionName(e.target.value)}
                 />
            <label htmlFor='transaction-amount'>Amount($): </label>
            <input id='transaction-amount'
                   type='number'
                   name='transaction-amount'
                   value={amount}
                   required
                   onChange={(e) => setAmount(e.target.value)}
            />
            <button>Add Transaction</button>
      </form>
  </>;
}

export default TransactionForm;
