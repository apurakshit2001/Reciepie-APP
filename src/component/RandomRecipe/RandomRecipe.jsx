import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RandomRecipe.css';

const RandomRecipe = () => {
    const [randomRecipe, setRandomRecipe] = useState(null);

    useEffect(() => {
        const fetchRandomRecipe = () => {
            axios
                .get("https://www.themealdb.com/api/json/v1/1/random.php")
                .then(response => {
                    const { meals } = response.data;
                    if (meals && meals.length > 0) {
                        setRandomRecipe(meals[0]);
                    }
                })
                .catch(error => {
                    console.error("Error fetching the random recipe:", error);
                });
        };

        fetchRandomRecipe();
    }, []);

    if (!randomRecipe) {
        return <p className="randomRecipe-loading">Loading...</p>;
    }


    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = randomRecipe[`strIngredient${i}`];
        const measure = randomRecipe[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredients.push(`${measure} ${ingredient}`);
        }
    }

    return (
        <div className="randomRecipe-container">
            <div className="randomLeftSide">
                <h1 className='recipeHeading'>Top Recipe</h1>
                <h1 className="randomRecipe-title">{randomRecipe.strMeal}</h1>
                <img className="randomRecipe-image" src={randomRecipe.strMealThumb} alt={randomRecipe.strMeal} />
            </div>
            <div className="randomRightSide">
                <div className="randomMain">
                    <div className="upperFlex">
                        <p className="randomRecipe-category"><strong>Category:</strong> {randomRecipe.strCategory}</p>
                        <p className="randomRecipe-cuisine"><strong>Cuisine:</strong> {randomRecipe.strArea}</p>
                    </div>
                    <p className="randomRecipe-instructionsTitle"><strong>Instructions:</strong></p>
                    <p className="randomRecipe-instructions">{randomRecipe.strInstructions}</p>
                </div>

                <div className="randomRightLower">
                    <div className="randomPoints">
                        <p className="randomRecipe-ingredientsTitle"><strong>Ingredients:</strong></p>
                        <ul className="randomRecipe-ingredients">
                            {ingredients.map((item, index) => (
                                <li key={index} className="randomRecipe-ingredient">{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="randomLinks">
                        {randomRecipe.strTags && <p className="randomRecipe-tags"><strong>Tags:</strong> {randomRecipe.strTags}</p>}
                        {randomRecipe.strYoutube && (
                            <p className="randomRecipe-youtube">
                                <strong>Video:</strong> <a href={randomRecipe.strYoutube} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
                            </p>
                        )}
                        {randomRecipe.strSource && (
                            <p className="randomRecipe-source">
                                <strong>Source:</strong> <a href={randomRecipe.strSource} target="_blank" rel="noopener noreferrer">Original Recipe</a>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RandomRecipe;
