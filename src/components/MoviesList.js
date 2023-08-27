import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props) => {
  const deleteMovieHandler = (id) => {
    props.onDeleteMovie(id);
  };

  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
        >
        <button onClick={() => deleteMovieHandler(movie.id)}>Delete</button>
      </Movie>
      ))}
      
    </ul>
  );
};

export default MovieList;
