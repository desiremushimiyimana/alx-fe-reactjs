import React, { useState } from "react";
import { searchUsers, fetchUserDetails } from "../services/githubService";

const Search = () => {
  const [searchParams, setSearchParams] = useState({
    username: "",
    location: "",
    minRepos: "",
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const fetchUserData = async (username) => {
    try {
      const userData = await fetchUserDetails(username);
      return userData;
    } catch (error) {
      console.error(`Error fetching data for ${username}:`, error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSearchResults([]);

    try {
      const data = await searchUsers(searchParams);
      const detailedResults = await Promise.all(
        data.items.slice(0, 10).map((user) => fetchUserData(user.login))
      );
      setSearchResults(detailedResults.filter(Boolean));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={searchParams.username}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={searchParams.location}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="minRepos"
            className="block text-sm font-medium text-gray-700"
          >
            Minimum Repositories
          </label>
          <input
            type="number"
            id="minRepos"
            name="minRepos"
            value={searchParams.minRepos}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            min="0"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Search
        </button>
      </form>

      {isLoading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {searchResults.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {searchResults.map((user) => (
            <div key={user.id} className="border rounded-lg p-4 shadow-sm">
              <img
                src={user.avatar_url}
                alt={`${user.login}'s avatar`}
                className="w-16 h-16 rounded-full mx-auto mb-2"
              />
              <h2 className="text-xl font-semibold text-center">
                {user.name || user.login}
              </h2>
              <p className="text-gray-600 text-center">
                {user.location || "Location not specified"}
              </p>
              <p className="text-center">Repositories: {user.public_repos}</p>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 text-center text-blue-500 hover:underline"
              >
                View GitHub Profile
              </a>
            </div>
          ))}
        </div>
      )}
      {searchResults.length === 0 && !isLoading && !error && (
        <p className="text-center">
          No results found. Try adjusting your search criteria.
        </p>
      )}
    </div>
  );
};

export default Search;
