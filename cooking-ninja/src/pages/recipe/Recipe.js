import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { projectFirestore } from '../../firebase/config'  // Firebase import
// import { useFetch } from '../../hooks/useFetch'
import { useTheme } from '../../hooks/useTheme'

import './Recipe.css'

export default function Recipe() {
  const params = useParams()
  // const url = 'http://localhost:3000/recipes/' + id
  // const { error, isPending, data: recipe } = useFetch(url)
  const [isPending, setIsPending] = useState(false)
  const [recipe, setRecipe] = useState(null)
  const [error, setError] = useState(false)
  const { mode } = useTheme()
  

  // doc.data() is prototype f() that needs to be called to get the data from the firebase
  useEffect(()=>{
    setIsPending(true)
    const unsub = projectFirestore.collection('recipes').doc(params.id)
                                          .onSnapshot((doc)=> {
                                            console.log('doc', doc)
                                            if(doc.exists){
                                              setIsPending(false)
                                              setRecipe(doc.data())
                                            } else {
                                              setIsPending(false)
                                              setError('Could Not Find the Recipe Document')
                                            }
                                            
                                          })
    return () => unsub() // clean up listner if move away.                                      
  },[params.id])

  const handleUpdate = () => {
      console.log('The params.id ', params.id)
      projectFirestore.collection('recipes').doc(params.id)
                                           .update({title: 'NEW TITLE'})
  }

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
          </ul>
          <p className="method">{recipe.method}</p>
          <button onClick={handleUpdate}>Update</button>
        </>
      )}
    </div>
  )
}