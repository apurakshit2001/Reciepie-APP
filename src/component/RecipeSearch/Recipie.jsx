import axios from 'axios';
import './Recipie.css';
import { InfinitySpin } from 'react-loader-spinner';
import React, { useEffect, useState } from 'react';
import Slideshow from '../Restaurants/SLIDESHOW';

const Recipe = () => {
    const [recipes, setRecipes] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const appId1 = '6e007eb3';
    const appKey1 = 'f3a121ff5fda598762c1c91c9295dd2a';

    useEffect(() => {
        if (query) {
            setLoading(true);
            axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${appId1}&app_key=${appKey1}`)
                .then((response) => {
                    console.log(response.data);
                    setRecipes(response.data.hits);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error.response?.status, error.response?.data);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [query]);

    const handleSearch = (e) => {
        e.preventDefault();
        const searchQuery = e.target.elements.query.value.trim();
        if (searchQuery) {
            setQuery(searchQuery);
        }
    };

    return (
        <div className='recipiePage'>
            <div className="slideHere">
            <Slideshow/>
            </div>
            <form onSubmit={handleSearch}>
                <div className="recipe">
                    <input type="text" name="query" placeholder="Search for a recipe" />
                    <button type="submit" className='btn2'>
                        <span>Search Recipe</span>
                    </button>
                </div>
            </form>

            {loading ? (
                <center>
                    <InfinitySpin
                        visible={true}
                        width="200"
                        color="#00d4ff"
                        ariaLabel="infinity-spin-loading"
                    />
                </center>
            ) : (
                <div>
                    <h1 className='recipeHeading'>Recipes</h1>
                    {recipes.map((recipe, index) => (
                        <div key={index} className="recipe-card">
                            <div className="leftBox">
                                <h2 className='recipeName'>{recipe.recipe.label}</h2>
                                <img className='recipeImg' src={recipe.recipe.image} alt={recipe.recipe.label} />
                            </div>
                            <div className="rightBox">
                                <div className="rightUpper">
                                    <div className="rightUpperRight">
                                        <p><strong>Calories:</strong> {Math.round(recipe.recipe.calories)}</p>
                                        <p><strong>Cuisine Type:</strong> {recipe.recipe.cuisineType?.join(', ') || 'N/A'}</p>
                                        <p><strong>Meal Type:</strong> {recipe.recipe.mealType?.join(', ') || 'N/A'}</p>
                                        <p><strong>Dish Type:</strong> {recipe.recipe.dishType?.join(', ') || 'N/A'}</p>
                                        <p><strong>Diet Labels:</strong> {recipe.recipe.dietLabels?.join(', ') || 'N/A'}</p>
                                        <p><strong>Total Time:</strong> {recipe.recipe.totalTime ? `${recipe.recipe.totalTime} minutes` : 'N/A'}</p>
                                        <p><strong>CO2 Emissions Class:</strong> {recipe.recipe.co2EmissionsClass || 'N/A'}</p>
                                    </div>
                                    <div className="rightUpperLeft recipeIngredients">
                                        <p className='IngredientsHeading'><strong>Ingredients:</strong></p>
                                        <ul className='IngredientsList'>
                                            {recipe.recipe.ingredientLines.map((ingredient, i) => (
                                                <li className='IngredientListItem' key={i}>{ingredient}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="rightLower">
                                    <details>
                                        <summary><strong>Health Labels:</strong></summary>
                                        <p>{recipe.recipe.healthLabels?.join(', ') || 'N/A'}</p>
                                    </details>
                                    <a href={recipe.recipe.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                        <button className='btn3 btn3-1'>
                                            <span>View Full Recipe</span>
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Recipe;
