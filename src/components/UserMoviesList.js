import React from 'react';
import PropTypes from 'prop-types';
import Movie from './Movie';

const UserMoviesList = ({movies, imageBaseUrl, posterSize, 
  removeMovie, moveMovie}) => (

  <div className="UserMoviesList">
    {movies.map((movie) => {
      return <Movie 
        movie={movie} 
        imageBaseUrl={imageBaseUrl}
        posterSize={posterSize}
        removeMovie={movie => removeMovie(movie)}
        moveMovie={(movie, direction) => moveMovie(movie, direction)}
        key={movie.id} />
    })}
  </div>
)

UserMoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  imageBaseUrl: PropTypes.string.isRequired,
  posterSize: PropTypes.string.isRequired,
  removeMovie: PropTypes.func.isRequired,
  moveMovie: PropTypes.func.isRequired
};

export default UserMoviesList;