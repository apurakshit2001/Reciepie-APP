import React, { useContext, useState, useEffect } from 'react';
import './NutritionAnalysis.css';
import axios from 'axios';
import { UserContext } from '../ContextAPI/Context';
import animationData from '../../assets/animation2.json';
import Lottie from 'lottie-react';
import { InfinitySpin } from 'react-loader-spinner';

const NutritionAnalysis = () => {
  const { nutritionRecipe } = useContext(UserContext);
  const [ingredients, setIngredients] = useState('');
  const [nutritionData, setNutritionData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const appId = 'c9176f85';
  const appKey = '5d67ae9ce4178be9dfb40a2301ee3d5b';

  useEffect(() => {
    if (nutritionRecipe) {
      setIngredients(nutritionRecipe.ingredientLines?.join('\n') || '');
    }
  }, [nutritionRecipe]);

  const analyzeNutrition = () => {
    if (!ingredients.trim()) {
      setError('Please enter ingredients before analyzing.');
      return;
    }

    const options = {
      method: 'POST',
      url: `https://api.edamam.com/api/nutrition-details?app_id=${appId}&app_key=${appKey}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        ingr: ingredients.split('\n'),
      },
    };

    setLoading(true); // Set loading to true before the request

    axios(options)
      .then((response) => {
        setNutritionData(response.data);
        setError(null); // Clear any previous errors
      })
      .catch((err) => {
        setError('Error analyzing the ingredients');
        setNutritionData(null);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the request is complete
      });
  };

  if (!nutritionRecipe) {
    return <center className='nothing'>
      <h1>No recipe selected for nutrition analysis.</h1>      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ height: 400, width: 400 }}
      />
    </center>;
  }

  return (
    <div className='NutritionAnalysisPage'>
      <h1 className='NutritionAnalysisPageHeading'>Nutrition Analysis</h1>

      <div className="controlContainer">
        <div className="searchBox">
          <textarea
            className='IngredientsInput'
            rows='5'
            cols='50'
            placeholder='Enter ingredients, one per line'
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          ></textarea>
          <button onClick={analyzeNutrition} className='btn2 AnalyzeButton'>
            <span>Analyze</span>
          </button>
        </div>

        {error && <div className="errDiv"><p className='Error'>{error}</p></div>}
      </div>

      {loading ? (
        <div className="loadingIndicator">
          <center>
            <InfinitySpin
              visible={true}
              width="200"
              color="#00d4ff"
              ariaLabel="infinity-spin-loading"
            />
          </center>
        </div>
      ) : nutritionData ? (
        <div className="nutritionCard">

          <div className='RecipeDetails upperDiv'>
            <div className="imgbox">
              <h2 className='recipeName'>{nutritionRecipe.label}</h2>
              <img src={nutritionRecipe.image} alt={nutritionRecipe.label} className='RecipeImage' />
            </div>
            <div className="mainNutri">
              <h2 className='mainNutriHeading'>Nutrition Information</h2>
              <p><strong>Calories:</strong> {nutritionData.calories}</p>
              <p><strong>Weight:</strong> {nutritionData.totalWeight} g</p>
            </div>

          </div>
          <div className='NutritionResults'>

            <div className="macroNutri">
              <h3 className='macroNutriHeading'>Macronutrients:</h3>
              <ul className='macroNutriList' type='disc'>
                <li className='macroNutriListItems'><strong>Protein:</strong> {nutritionData.totalNutrients?.PROCNT?.quantity || 0} g</li>
                <li className='macroNutriListItems'><strong>Fat:</strong> {nutritionData.totalNutrients?.FAT?.quantity || 0} g</li>
                <li className='macroNutriListItems'><strong>Carbohydrates:</strong> {nutritionData.totalNutrients?.CHOCDF?.quantity || 0} g</li>
              </ul>
            </div>
            <div className="otherNutriInfo">
              <h3 className='otherNutriHeading'>Other Nutritional Information:</h3>
              <ul className='otherNutriList' type='square'>
                {nutritionData.totalNutrients && Object.entries(nutritionData.totalNutrients).map(([key, value]) => (
                  <li className='otherNutriListItems' key={key}>
                    <strong>{value.label}:</strong> {value.quantity} {value.unit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <center className="emptyMSg">
          <p className='emptyMSgtxt'>No nutrition data available for this food item.</p>
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            style={{ height: 400, width: 400 }}
          />
        </center>
      )}
    </div>
  );
};

export default NutritionAnalysis;
