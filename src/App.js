import React, { useState, useEffect } from 'react';
import './App.css';
import Recipe from './Recipe'
function App() {

  const APP_ID = '86166fc3'
  const APP_KEY = 'dc6efa0600a3149fa42cb0d287d3a7f4'

  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [query,setQuery] = useState('chicken')

  useEffect(() =>{
    console.log('effect')
    getRecipe()
  },[query])
  //now the state will update when we submit the form

  const getRecipe = async () =>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json()
    console.log(data)
    setRecipes(data.hits)
    /*fetch(url).then(response =>{
      response.json()
    }).then(data => console.log(data)) */
  }
  const updateSearch = e =>{
    setSearch(e.target.value)
  }
  const getSearch = e =>{
    e.preventDefault();
    setQuery(search)
    setSearch('')
  }
  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input className="search-bar" type='text'
        value={search} onChange={updateSearch}></input>
        <button className="search-button" type="submit">
          search
        </button>
      </form>
      
      <div className='recipe'> 
      {recipes.map( (recipe,index) =>{
        return(
        <Recipe key={index} 
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}></Recipe>
        )
      })}
      </div>

    </div>
  );
}

export default App;
