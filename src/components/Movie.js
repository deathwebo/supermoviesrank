import React from 'react';

const Movie = ({movie, imageBaseUrl, posterSize, 
  removeMovie, addToTop, addToBottom, moveMovie}) => (
  <div className="movie">

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

      <div className="movie--options">

      {addToTop && <button onClick={() => addToTop(movie)}>TOP</button> }
      {addToBottom && <button onClick={() => addToBottom(movie)}>BOTTOM</button> }
      {removeMovie && <button onClick={() => removeMovie(movie)}>REMOVE</button> }
      {moveMovie && <button onClick={() => moveMovie(movie, 'up')}>UP</button> }
      {moveMovie && <button onClick={() => moveMovie(movie, 'down')}>DOWN</button> }

      </div>

    </div>

  </div>
)

export default Movie;