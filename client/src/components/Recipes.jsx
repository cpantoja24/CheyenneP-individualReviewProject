import React from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { configureStore } from '@reduxjs/toolkit';
import { useNavigate } from "react-router-dom";
import { useState } from "react"

// Define an API using createApi
const recipesApi = createApi({
  // Unique string used in constructing Redux action types, state selectors, and React hook names
  reducerPath: "recipes",
  // Define a base query function that all endpoints will use as the base of their request
  baseQuery: fetchBaseQuery({
    // The base URL for all requests
    baseUrl: `http://localhost:8080/api`,
    prepareHeaders(headers) {
      headers.set('Content-type', 'application/json'); // Set the Content-type header to application/json
      return headers;
    }

  }),
  // Define endpoints for our API service
  endpoints: (builder) => ({
    // Define an endpoint that fetches players
    getRecipes: builder.query({
      // The part of the URL that comes after the baseUrl for this specific endpoint
      query: () => `/recipes`,
    }),
  }),
});

// Export hooks for each endpoint - in this case, a React hook that triggers the fetchAllRecipes query
const { useGetRecipesQuery } = recipesApi;

// Create a Redux store
export const store = configureStore({
  reducer: {
    // The key is the reducerPath we defined in our API service, and the value is the reducer
    [recipesApi.reducerPath]: recipesApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recipesApi.middleware), // Add the middleware for the posts API
});

export default function Recipes() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate();

  const { data = {}, error, isLoading } = useGetRecipesQuery();

  if (isLoading) {
    return <div className={data.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={data.error}>Error: {error.message}</div>;
  }

  return (
    <>
      <br />
      <div>
        <form>
          <input placeholder="Type recipe name here..."
            onChange={(e) => setSearch(e.target.value)} />
        </form>
      </div>
      
      <div className="allCards">
        {data.filter((recipe) => {
          return search.toLowerCase() === '' ? recipe : recipe.name.toLowerCase().includes(search)
        }).map((recipe) => (
          <div key={recipe.recipeId} className="singleCard">
            <h3>{recipe.name}</h3>
            <p>{recipe.description}</p>
            <br />
            <button onClick={() => {
              navigate(`/recipes/${recipe.recipeId}`)
            }}>See Details</button>
          </div>
        ))}
      </div>
    </>
  );
};

