import { Routes, Route, Link } from 'react-router-dom'
import Recipes from './Recipes'
import SingleRecipe from './SingleRecipe'
import Ingredients from './Ingredients'

export default function NavBar() {

    return (
        <>
            <p>Welcome</p>
            <div id="navbar">
                <Link to={'/'}>Recipes</Link>
                <br />
                <Link to={'/ingredients'}>Ingredients</Link>
            </div>
            <Routes>
                <Route path='/' element={<Recipes />} />
                <Route path='/recipes/:recipeId' element={<SingleRecipe />} />
                <Route path='/ingredients' element={<Ingredients />} />
            </Routes>
        </>
    )
}