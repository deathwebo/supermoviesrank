import React from 'react';
import Movie from './Movie';

const ResourceMoviesList = ({ movies, imageBaseUrl, posterSize, addToTop, addToBottom, filter = '' }) => (
  <div className="ResourceMoviesList">
    {movies
    .filter(movie => movie.title.toLowerCase().search(filter.toLowerCase()) !== -1)
    .map(movie => {
      return <Movie
        movie={movie}
        imageBaseUrl={imageBaseUrl}
        posterSize={posterSize}
        addToTop={movie => addToTop(movie)}
        addToBottom={movie => addToBottom(movie)}
        key={movie.id} />
    })}
  </div>
)

export default ResourceMoviesList;