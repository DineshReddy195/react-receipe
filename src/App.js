import './App.css';
import Foodreceipe from './Components/Foodreceipe';
import {React, useEffect, useState} from 'react';

function App() {
    const api_id = "af275f76";
    const api_key = "a1e92ab170607c58cd6e76dec6300bbe";
    const [apiData, setapiData] = useState([]);
    const [input, setInput] = useState("");
    const [query, setquery] = useState("");
  
    useEffect(() => {
      getrecipe();
    }, [query]);
    const getrecipe = async () => {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${api_id}&app_key=${api_key}`
      );
      const data = await response.json();
      setapiData(data.hits);
    };
  
    const updateresult = (e) => {
      setInput(e.target.value);
    };
  
    const getresult = (e) => {
      e.preventDefault();
      setquery(input);
      setInput("");
    };
  
    return (
      <div className="App">
        <div className="heading">
          <h1>Food Fly</h1>
        </div>
        <form className="form" onSubmit={getresult}>
          <input
            className="text"
            type="text"
            value={input}
            onChange={updateresult}
            placeholder="Look up for something delicious.."
          />
          <button className="button" type="submit">
            Search
          </button>
        </form>
        <div className="tagline-main">
          <p className="tagline">Recipes</p>
        </div>
        <div className="result">
          {apiData.map((recipe) => (
            <Foodreceipe
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
