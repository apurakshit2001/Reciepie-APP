import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const addToFavorites = (recipe) => {
        setFavorites([...favorites, recipe]); 
    };

    const removeFromFavorites = (recipeLabel) => {
        setFavorites(favorites.filter(fav => fav.label !== recipeLabel)); 
    };

    return (
        <UserContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
            {children}
        </UserContext.Provider>
    );
};
