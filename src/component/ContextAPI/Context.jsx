import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [nutritionRecipe, setNutritionRecipe] = useState(null); 

    const addToFavorites = (recipe) => {
        setFavorites([...favorites, recipe]); 
    };

    const removeFromFavorites = (recipeLabel) => {
        setFavorites(favorites.filter(fav => fav.label !== recipeLabel)); 
    };

    const nutritionAnalysis = (recipe) => {
        setNutritionRecipe(recipe);
    };

    return (
        <UserContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, nutritionRecipe, nutritionAnalysis }}>
            {children}
        </UserContext.Provider>
    );
};
