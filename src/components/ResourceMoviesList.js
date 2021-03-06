import React from 'react';
import PropTypes from 'prop-types';
import Movie from './Movie';

const ResourceMoviesList = (props) => {

  let { addToTop, addToBottom, filter = '' } = props;
  
  return (
  <div className="ResourceMoviesList">
    {props.movies
    .filter(movie => movie.title.toLowerCase().search(filter.toLowerCase()) !== -1)
    .map(movie => {

      let foundMovie = props.userMovies.filter(currentMovie => {
        return currentMovie.id === movie.id;
      });

      let isMovieAdded = (foundMovie.length > 0);

      return <Movie
        movie={movie}
        imageBaseUrl={props.imageBaseUrl}
        posterSize={props.posterSize}
        addToTop={movie => addToTop(movie)}
        addToBottom={movie => addToBottom(movie)}
        isMovieAdded={isMovieAdded}
        key={movie.id} />
    })}
  </div>
  )
}

ResourceMoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  imageBaseUrl: PropTypes.string.isRequired,
  posterSize: PropTypes.string.isRequired,
  addToTop: PropTypes.func.isRequired,
  addToBottom: PropTypes.func.isRequired
};

export default ResourceMoviesList;