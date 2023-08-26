import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError]  = useState(null);
  const [retrying, setRetrying] = useState(false);
  
  const fetchMoviesHandler = useCallback(async () => {
    setIsloading(true);
    setError(null);
    setRetrying(true);
    try {
      const response = await fetch('https://swapi.dev/api/films/');
      console.log("fetching")
      if (!response.ok) {
        throw new Error("Something went wrong ....Retrying");
      }
      const data = await response.json();
      
   
      const transformedMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        }
      })
      setMovies(transformedMovies);
      setIsloading(false);
      setRetrying(false);
    } catch (error) {
      setError(error.message)
      setRetrying(true);
      // retry();
    }
    setIsloading(false);

    // function retry() {
    //   console.log("retry called");
    //   if (retrying) {
    //     setTimeout(fetchMoviesHandler, 5000);
    //   }
    // }
 }, [])

 useEffect(() => {
  fetchMoviesHandler();
 }, [fetchMoviesHandler]);

//  const retry = useMemo(() => {
//   return () => {
//     if (retrying) {
//       setTimeout(() => {
//         fetchMoviesHandler();
//       }, 5000);
//     }
//   };
// }, [retrying, fetchMoviesHandler]);

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

 const cancelRetryHandler = () => {
  setRetrying(false);
  setError(null);
};

let content = <p>Found no movies</p>;
 
if (isLoading) {
  content = <p>Loading...</p>
}else if (error) {
  content = (
    <div>
      <p>{error}</p>
      <button onClick={cancelRetryHandler}>Cancel Retry</button>
    </div>
  )
}else if (movies.length > 0) {
  content = <MoviesList movies={movies} />;
}

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler} disabled={retrying}>Fetch Movies</button>
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
