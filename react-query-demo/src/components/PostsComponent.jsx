import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchPosts = async (page = 1) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
  );
  return data;
};

function PostsComponent() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error, refetch } = useQuery(
    ["posts", page],
    () => fetchPosts(page),
    {
      staleTime: 60000, // 1 minute
      cacheTime: 300000, // 5 minutes
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Posts</h2>
      <button onClick={() => refetch()}>Refetch Posts</button>
      <ul>{data && data.map((post) => <li key={post.id}>{post.title}</li>)}</ul>
      <div>
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          Previous Page
        </button>
        <span>Current Page: {page}</span>
        <button onClick={() => setPage((old) => old + 1)}>Next Page</button>
      </div>
    </div>
  );
}

export default PostsComponent;
