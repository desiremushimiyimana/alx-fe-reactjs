import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
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

        setRecipes(allRecipes);
      } catch (error) {
        console.error("Error fetching recipe data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center p-4 bg-indigo-600">
        <h1 className="text-2xl font-bold text-white">
          Recipe Sharing Platform
        </h1>
        <button
          onClick={() => navigate("/add-recipe")}
          className="bg-white text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-100 transition duration-300"
        >
          Add New Recipe
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8 bg-gray-100">
        {recipes.map((recipe) => (
          <Link
            key={recipe.id}
            to={`/recipe/${recipe.id}`}
            className="bg-white p-6 mb-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform transition-shadow duration-300 ease-in-out"
          >
            <h2 className="text-2xl font-extrabold text-gray-800 mb-3">
              {recipe.title}
            </h2>
            <p className="text-gray-500 text-sm mb-4">{recipe.summary}</p>
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover rounded-md"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
