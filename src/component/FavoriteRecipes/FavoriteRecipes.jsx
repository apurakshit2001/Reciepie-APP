import React, { useContext } from 'react';
import { UserContext } from '../ContextAPI/Context';
import './FavoriteRecipes.css'
import animationData from '../../assets/animation.json'
import Lottie from 'lottie-react';

const FavoriteRecipes = () => {
    const { favorites, removeFromFavorites } = useContext(UserContext);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div className="favorite-recipes-page">
            <h1>Your Favorite Recipes</h1>
            {favorites.length === 0 ? (
                <center>
                    <p className='recipeTxt'>No favorite recipes added yet.</p>

                    <Lottie
                        animationData={animationData}
                        loop={true}
                        autoplay={true}
                        style={{ height: 400, width: 400 }}
                    />


                </center>
            ) : (
                <div className="favorite-recipes-list">
                    {favorites.map((recipe, index) => (
                        <div key={index} className="recipe-card">
                            <div className="leftBox">
                                <h2 className='recipeName'>{recipe.label}</h2>
                                <img className='recipeImg' src={recipe.image} alt={recipe.label} />
                            </div>
                            <div className="rightBox">
                                <p className='recipeTxt'><strong>Calories:</strong> {Math.round(recipe.calories)}</p>
                                <p className='recipeTxt'><strong>Cuisine Type:</strong> {recipe.cuisineType?.join(', ') || 'N/A'}</p>
                                <p className='recipeTxt'><strong>Meal Type:</strong> {recipe.mealType?.join(', ') || 'N/A'}</p>
                                <p className='recipeTxt'><strong>Dish Type:</strong> {recipe.dishType?.join(', ') || 'N/A'}</p>
                                <p className='recipeTxt'><strong>Diet Labels:</strong> {recipe.dietLabels?.join(', ') || 'N/A'}</p>
                                <p className='recipeTxt'><strong>Total Time:</strong> {recipe.totalTime ? `${recipe.totalTime} minutes` : 'N/A'}</p>
                                <button className='btn-remove btn2' onClick={() => removeFromFavorites(recipe.label)}>
                                    Remove from Favorites
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoriteRecipes;
