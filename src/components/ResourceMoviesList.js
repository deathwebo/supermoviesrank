import React from 'react';
import PropTypes from 'prop-types';
import Movie from './Movie';

const ResourceMoviesList = ({ movies, imageBaseUrl, posterSize, addToTop, 
  addToBottom, filter = '', userMovies }) => (
  <div className="ResourceMoviesList">
    {movies
    .filter(movie => movie.title.toLowerCase().search(filter.toLowerCase()) !== -1)
    .map(movie => {
      let isMovieAdded = (userMovies.indexOf(movie) !== -1);

      return <Movie
        movie={movie}
        imageBaseUrl={imageBaseUrl}
        posterSize={posterSize}
        addToTop={movie => addToTop(movie)}
        addToBottom={movie => addToBottom(movie)}
        isMovieAdded={isMovieAdded}
        key={movie.id} />
    })}
  </div>
)

ResourceMoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  imageBaseUrl: PropTypes.string.isRequired,
  posterSize: PropTypes.string.isRequired,
  addToTop: PropTypes.func.isRequired,
  addToBottom: PropTypes.func.isRequired,
  filter: PropTypes.string
};

export default ResourceMoviesList;