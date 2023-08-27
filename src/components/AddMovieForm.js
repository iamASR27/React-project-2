import React, { useState } from 'react';
import styles from "./AddMovieForm.module.css";

const AddMovieForm = ({ onAddMovie }) => {
  const [newMovieTitle, setNewMovieTitle] = useState('');
  const [newMovieOpeningText, setNewMovieOpeningText] = useState('');
  const [newMovieReleaseDate, setNewMovieReleaseDate] = useState('');

  const addMovieHandler = () => {
    const newMovie = {
      title: newMovieTitle,
      openingText: newMovieOpeningText,
      releaseDate: newMovieReleaseDate,
    };
    onAddMovie(newMovie);
    setNewMovieTitle('');
    setNewMovieOpeningText('');
    setNewMovieReleaseDate('');
  };

  return (
    <form className={styles.addMovieForm}>
      <div>
        <label htmlFor='title'>Title</label>
        <input
          type="text"
          value={newMovieTitle}
          id='title'
          onChange={(event) => setNewMovieTitle(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor='opening-text'>Opening Text</label>
        <textarea
          id='opening-text'
          rows={3}
          value={newMovieOpeningText}
          onChange={(event) => setNewMovieOpeningText(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor='release-date'>Release Date</label>
        <input
          type="date"
          id='release-date'
          value={newMovieReleaseDate}
          onChange={(event) => setNewMovieReleaseDate(event.target.value)}
        />
      </div>
      <button type="button" onClick={addMovieHandler}>
        Add Movie
      </button>
    </form>
  );
};

export default AddMovieForm;
