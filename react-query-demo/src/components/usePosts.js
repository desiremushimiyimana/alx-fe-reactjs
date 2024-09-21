import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const usePosts = () => {
    const queryClient = useQueryClient();

    const fetchPosts = async () => {
        const { data } = await axios.get(API_URL);
        return data;
    };

    const addPost = async (newPost) => {
        const { data } = await axios.post(API_URL, newPost);
        return data;
    };

    const postsQuery = useQuery('posts', fetchPosts, {
        staleTime: 60000, // 1 minute
        cacheTime: 300000, // 5 minutes
    });

    const addPostMutation = useMutation(addPost, {
        onSuccess: (data) => {
            queryClient.setQueryData('posts', (oldPosts) => [...oldPosts, data]);
        },
    });

    return {
        posts: postsQuery.data,
        isLoading: postsQuery.isLoading,
        isError: postsQuery.isError,
        error: postsQuery.error,
        refetch: postsQuery.refetch,
        addPost: addPostMutation.mutate,
    };
};