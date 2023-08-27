import React, { useCallback, useEffect, useState } from "react";
import AddMovieForm from "./components/AddMovieForm";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);
  const [retrying, setRetrying] = useState(false);

  const fetchMoviesHandler = useCallback(async () => {
    setIsloading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://practice-reactjs-8c122-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong ....Retrying");
      }
      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
      setIsloading(false);
      setRetrying(false);
    } catch (error) {
      setError(error.message);
      setRetrying(true);
    }
    setIsloading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  useEffect(() => {
    if (retrying) {
      const retryInterval = setInterval(() => {
        fetchMoviesHandler();
      }, 5000);
      return () => {
        clearInterval(retryInterval);
      };
    }
  }, [retrying, fetchMoviesHandler]);

  const cancelRetryHandler = useCallback(() => {
    setRetrying(false);
    setError(null);
  }, []);

  const addMovieHandler = async (movie) => {
    // console.log(movie);
    const response = await fetch(
      "https://practice-reactjs-8c122-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    fetchMoviesHandler();
  };

  const deleteMovieHandler = async (movieId) => {
    try {
      const response = await fetch(
        `https://practice-reactjs-8c122-default-rtdb.firebaseio.com/movies/${movieId}.json`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete movie");
      }
      const updatedMovies = movies.filter((movie) => movie.id !== movieId);
      setMovies(updatedMovies);
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  let content = <p>Found no movies</p>;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = (
      <div>
        <p>{error}</p>
        <button onClick={cancelRetryHandler}>Cancel Retry</button>
      </div>
    );
  } else if (movies.length > 0) {
    content = <MoviesList movies={movies} onDeleteMovie={deleteMovieHandler} />;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovieForm onAddMovie={addMovieHandler} />{" "}
        {/* Use the new component */}
      </section>
      <section>
        <button onClick={fetchMoviesHandler} disabled={retrying}>
          Fetch Movies
        </button>
      </section>
      <section>
        {content}
        {/* {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Found no movies</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>} */}
      </section>
    </React.Fragment>
  );
}

export default App;
