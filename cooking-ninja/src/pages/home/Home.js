// import { useFetch } from '../../hooks/useFetch'
import React, {useState, useEffect} from 'react'
import { projectFirestore } from '../../firebase/config'  // Firebase import

import RecipeList from '../../components/RecipeList'
import './Home.css'

export default function Home() {
  // const { data, isPending, error } = useFetch('http://localhost:3000/recipes')


  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

  useEffect(()=>{
    setIsPending(true)
    const subscription = projectFirestore.collection('recipes')
                              .onSnapshot((snapshot)=>{
                                console.log(snapshot)
                                if(snapshot.empty){
                                  setError('No Recipes to Load')
                                  setIsPending(false)
                                } else {
                                  let results =[]
                                  snapshot.docs.forEach((doc)=> {
                                    console.log(doc)
                                    results.push({id: doc.id, ...doc.data()}) // spread operator to get data items
                                  })
                                  setData(results);
                                  setIsPending(false);
                                }
                              }, (err) => {
                                setError(err.message)
                                setIsPending(false)
                              })
    return () => subscription() // cleans up listener if move to another page
  },[]);


  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}
