import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        // Fetch data from data.json
        const response = await fetch("../src/data.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Get recipes from local storage
        const localRecipes = JSON.parse(
          localStorage.getItem("recipes") || "[]"
        );

        // Combine data from JSON and local storage
        const allRecipes = [...data, ...localRecipes];

        // Find the recipe with the matching id
        const recipeData = allRecipes.find(
          (recipe) => recipe.id === parseInt(id)
        );

        if (recipeData) {
          setRecipe(recipeData);
        } else {
          setError("Recipe not found");
        }
      } catch (error) {
        console.error("Error fetching recipe data:", error);
        setError("Error loading recipe");
      }
    };

    fetchRecipe();
  }, [id]);

  if (error) {
    return <div className="text-center text-red-500 text-xl mt-8">{error}</div>;
  }

  if (!recipe) {
    return <div className="text-center text-xl mt-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6">
        {recipe.title}
      </h1>

      <div className="mb-8">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
        />
        <p className="text-gray-600 text-lg font-medium text-center">
          {recipe.summary}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
          <ul className="list-disc pl-5 space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-700">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
          <ol className="list-decimal pl-5 space-y-4">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="text-gray-700">
                {instruction}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
