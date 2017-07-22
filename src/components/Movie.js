import React from 'react';
import PropTypes from 'prop-types';

const Movie = ({movie, imageBaseUrl, posterSize, 
  removeMovie, addToTop, addToBottom, moveMovie, isMovieAdded = false}) => (

  <div className={'movie ' + (isMovieAdded ? 'added' : '')}>

    <span className="movie--title">{movie.title}</span>

    <div className="movie--data">

      <div className="movie--poster">
        <img 
          src={imageBaseUrl+posterSize+movie.poster_path} 
          alt={'poster for the movie '+movie.title} />
      </div>

      <div className="movie--overview">
        {movie.overview}
      </div>

      {!isMovieAdded && (
        <div className="movie--options">

        {addToTop && <button onClick={() => addToTop(movie)}>TOP</button> }
        {addToBottom && <button onClick={() => addToBottom(movie)}>BOTTOM</button> }
        {removeMovie && <button onClick={() => removeMovie(movie)}>REMOVE</button> }
        {moveMovie && <button onClick={() => moveMovie(movie, 'up')}>UP</button> }
        {moveMovie && <button onClick={() => moveMovie(movie, 'down')}>DOWN</button> }

        </div>
      )}

    </div>

  </div>
)

Movie.propTypes = {
  movie: PropTypes.object.isRequired,
  imageBaseUrl: PropTypes.string.isRequired,
  posterSize: PropTypes.string.isRequired,
  removeMovie: PropTypes.func.isRequired,
  addToTop: PropTypes.func.isRequired,
  addToBottom: PropTypes.func.isRequired,
  moveMovie: PropTypes.func.isRequired,
  isMovieAdded: PropTypes.bool
};

export default Movie;