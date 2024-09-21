import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddRecipeForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    ingredients: "",
    steps: "",
  });
  const [errors, setErrors] = useState({});
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    // Fetch data from data.json and local storage to determine the next ID
    const fetchData = async () => {
      try {
        const response = await fetch("../src/data.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const localRecipes = JSON.parse(
          localStorage.getItem("recipes") || "[]"
        );
        const allRecipes = [...data, ...localRecipes];
        const maxId = Math.max(...allRecipes.map((recipe) => recipe.id), 0);
        setNextId(maxId + 1);
      } catch (error) {
        console.error("Error fetching recipe data:", error);
        setNextId(1); // Fallback to 1 if there's an error
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: e.target.value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.summary.trim()) newErrors.summary = "Summary is required";
    if (!formData.ingredients.trim())
      newErrors.ingredients = "Ingredients are required";
    if (formData.ingredients.split("\n").filter((i) => i.trim()).length < 2) {
      newErrors.ingredients = "Please enter at least two ingredients";
    }
    if (!formData.steps.trim()) newErrors.steps = "Steps are required";
    if (formData.steps.split("\n").filter((i) => i.trim()).length < 2) {
      newErrors.steps = "Please enter at least two steps";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newRecipe = {
        id: nextId,
        title: formData.title,
        summary: formData.summary,
        image: `https://via.placeholder.com/300x200?text=${formData.title.replace(
          / /g,
          "+"
        )}`,
        ingredients: formData.ingredients.split("\n").filter((i) => i.trim()),
        instructions: formData.steps.split("\n").filter((i) => i.trim()),
      };

      // Add new recipe to local storage
      const existingRecipes = JSON.parse(
        localStorage.getItem("recipes") || "[]"
      );
      localStorage.setItem(
        "recipes",
        JSON.stringify([...existingRecipes, newRecipe])
      );

      alert("Recipe submitted successfully!");
      navigate("/"); // Redirect to home page
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Recipe Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
              errors.title ? "border-red-500" : ""
            }`}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="summary"
            className="block text-sm font-medium text-gray-700"
          >
            Summary
          </label>
          <input
            type="text"
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
              errors.summary ? "border-red-500" : ""
            }`}
          />
          {errors.summary && (
            <p className="mt-1 text-sm text-red-500">{errors.summary}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="ingredients"
            className="block text-sm font-medium text-gray-700"
          >
            Ingredients (one per line)
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            rows="5"
            value={formData.ingredients}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
              errors.ingredients ? "border-red-500" : ""
            }`}
          ></textarea>
          {errors.ingredients && (
            <p className="mt-1 text-sm text-red-500">{errors.ingredients}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="steps"
            className="block text-sm font-medium text-gray-700"
          >
            Steps (one step per line)
          </label>
          <textarea
            id="steps"
            name="steps"
            rows="5"
            value={formData.steps}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
              errors.steps ? "border-red-500" : ""
            }`}
          ></textarea>
          {errors.steps && (
            <p className="mt-1 text-sm text-red-500">{errors.steps}</p>
          )}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Submit Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipeForm;
