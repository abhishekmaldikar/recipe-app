import React, {useState,useEffect}from 'react';
import './App.css';
import Recipe from "./Recipe";

const App = () => {


  const APP_ID = '15c02f12';
  const APP_KEY='d0873836f80e09a10c53f9725dc2144e';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');


 
  useEffect(() =>{
    getRecipes();
  },[query]);
  
  const getRecipes = async () =>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`)
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };
  
  const updateSearch = e => {
    setSearch(e.target.value);
    console.log(search);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };
  

  return(
     <div className= 'App'>
       <form onSubmit={getSearch} className= "search-form">
        <input className= "search-bar" type="text" onChange={updateSearch}/>
        <button className="search-button" type="submit" onClick={search}>
          search
        </button>
       </form>
       <div className='recipes'>
       {recipes.map(recipe =>(
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
       ))}
       </div>
     </div>
  );
}

export default App;
