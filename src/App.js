import React, { useState, useEffect } from "react";
import axios from 'axios';
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

const App = () => {
  // console.log("asd");
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    try {
      const response = await axios.get(`${API_URL}&s=${title}`);
      setMovies(response.data.Search);
    } catch (error) {
      console.error("There was a problem fetching the data:", error);
    }
  };

  return (
    <div className="app">
      <h1>Movie-App</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie, index) => (
            <MovieCard movie={movie} key={index} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
