import create from 'zustand'

export const useRecipeStore = create(set => ({
    recipes: [],
    searchTerm: '',
    filteredRecipes: [],
    favorites: [],
    recommendations: [],
    addRecipe: (newRecipe) => set(state => {
        const updatedRecipes = [...state.recipes, newRecipe];
        return {
            recipes: updatedRecipes,
            filteredRecipes: state.filterRecipes(updatedRecipes, state.searchTerm)
        };
    }),
    updateRecipe: (updatedRecipe) => set(state => {
        const updatedRecipes = state.recipes.map(recipe =>
            recipe.id === updatedRecipe.id ? updatedRecipe : recipe);
        return {
            recipes: updatedRecipes,
            filteredRecipes: state.filterRecipes(updatedRecipes, state.searchTerm)
        };
    }),
    deleteRecipe: (id) => set(state => {
        const updatedRecipes = state.recipes.filter(recipe => recipe.id !== id);
        return {
            recipes: updatedRecipes,
            filteredRecipes: state.filterRecipes(updatedRecipes, state.searchTerm)
        };
    }),
    setRecipes: (recipes) => set({
        recipes,
        filteredRecipes: recipes
    }),
    setSearchTerm: (searchTerm) => set(state => ({
        searchTerm,
        filteredRecipes: state.filterRecipes(state.recipes, searchTerm)
    })),
    filterRecipes: (recipes, searchTerm) =>
        recipes.filter(recipe =>
            recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
        ),
    addFavorite: (recipeId) => set(state => ({
        favorites: [...state.favorites, recipeId]
    })),
    removeFavorite: (recipeId) => set(state => ({
        favorites: state.favorites.filter(id => id !== recipeId)
    })),
    generateRecommendations: () => set(state => {
        // Simple recommendation logic based on favorites
        const recommended = state.recipes.filter(recipe =>
            !state.favorites.includes(recipe.id) && Math.random() > 0.5
        ).slice(0, 5); // Limit to 5 recommendations
        return { recommendations: recommended };
    }),
}));