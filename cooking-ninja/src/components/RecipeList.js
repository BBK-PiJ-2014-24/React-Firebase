import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import trashCan from '../assets/trashCan.svg'

// styles
import './RecipeList.css'
import { projectFirestore } from '../firebase/config'

export default function RecipeList({ recipes }) {
  const { mode } = useTheme()

  if (recipes.length === 0) {
    return <div className="error">No recipes to load...</div>
  }

  const handleDelete = (e) => {
      const id = e.target.getAttribute("id")
      console.log(id)
      projectFirestore.collection('recipes').doc(id)
                                            .delete()
  }

  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
          <img id={recipe.id}  className='trash-can' src={trashCan} alt='trash can' onClick={handleDelete} />
        </div>
      ))}
    </div>
  )
}
