import axios from 'axios';
import './Recipe3.css';
import { InfinitySpin } from 'react-loader-spinner';
import React, { useContext, useEffect, useState } from 'react';
import Slideshow from '../Restaurants/SLIDESHOW';
import { UserContext } from '../ContextAPI/Context';

const Recipe = () => {
    const [recipes, setRecipes] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Set the number of items per page

    const appId1 = '6e007eb3';
    const appKey1 = 'f3a121ff5fda598762c1c91c9295dd2a';

    useEffect(() => {
        if (query) {
            setLoading(true);
            setError('');
            axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${appId1}&app_key=${appKey1}`)
                .then((response) => {
                    if (response.data.hits.length === 0) {
                        setError('No recipes found.');
                    }
                    setRecipes(response.data.hits || []);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error.response?.status, error.response?.data);
                    setError('Error fetching data, please try again later.');
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
            setCurrentPage(1); // Reset to the first page on a new search
        }
    };

    const handleingredientNutritionsAnalysis = (ingredients) => {
        console.log('Nutrition analysis for ingredients:', ingredients);
    };

    const { addToFavorites } = useContext(UserContext);

    const handleAddToFavorite = (recipe) => {
        addToFavorites(recipe);
        console.log('Adding recipe to favorite:', recipe);
    };

    // Pagination Logic
    const indexOfLastRecipe = currentPage * itemsPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <center>
            <div className='recipePage'>
                <div className="slideHere">
                    <Slideshow />
                </div>
                <form onSubmit={handleSearch}>
                    <center>
                        <div className="recipe-inputContainer">
                            <input type="text" name="query" placeholder="Search for a recipe" />
                            <button type="submit" className='btn2 searchBtn'>
                                <span>Search Recipe</span>
                            </button>
                        </div>
                    </center>
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
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : (
                    <div>
                        <h1 className='recipeHeading'>Recipes</h1>
                        {currentRecipes.map((recipe, index) => (
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
                                            <ul className='IngredientsList' type='circle'>
                                                {recipe.recipe.ingredientLines.map((ingredient, i) => (
                                                    <li className='IngredientListItem' key={i}>{ingredient}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="rightLower">
                                        <details className='rightLowerLeftSide'>
                                            <summary><strong>Health Labels:</strong></summary>
                                            <p>{recipe.recipe.healthLabels?.join(', ') || 'N/A'}</p>
                                        </details>
                                        <div className="rightLowerRightSide buttons">
                                            <a href={recipe.recipe.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                                <button className='btn3 btn3-1'>
                                                    <span>View Full Recipe</span>
                                                </button>
                                            </a>
                                            <button className='btn2 btn3-2' onClick={() => handleingredientNutritionsAnalysis(recipe.recipe.ingredientLines)}>
                                                <span>Nutrition Analysis</span>
                                            </button>
                                            <button className='btn1 btn3-3' onClick={() => handleAddToFavorite(recipe.recipe)}>
                                                <span>Add to Favorite</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className='paginationButtons'>
                            {Array.from({ length: Math.ceil(recipes.length / itemsPerPage) }, (_, index) => (
                                <button id='paginationButton' className='btn5' key={index + 1} onClick={() => paginate(index + 1)}>
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </center>
    );
};

export default Recipe;
