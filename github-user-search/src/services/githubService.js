import axios from 'axios';

const API_BASE_URL = 'https://api.github.com';

export const searchUsers = async (params) => {
    const { username, location, minRepos } = params;
    let query = `${username}`;
    if (location) query += `+location:${location}`;
    if (minRepos) query += `+repos:>=${minRepos}`;

    try {
        const response = await axios.get(`https://api.github.com/search/users?q=${encodeURIComponent(query)}`, {
            params: {
                per_page: 10,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error('No users found');
        }
        throw new Error('An error occurred while searching for users');
    }
};

export const fetchUserDetails = async (username) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${username}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch user details');
    }
};