import React from "react";

const MovieSelector = ({ dummyMovies, selectedMovie, setSelectedMovie }) => {
  return (
    <div className="movie-row">
      <h2>Select a Movie</h2>
      {dummyMovies.map((movie, index) => (
        <button
          key={index}
          className={`movie-column ${
            selectedMovie === movie ? "movie-column-selected" : ""
          }`}
          onClick={() => setSelectedMovie(movie)}
        >
          {movie}
        </button>
      ))}
    </div>
  );
};

export default MovieSelector;
