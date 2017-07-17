import React from 'react';
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

export default UserMoviesList;