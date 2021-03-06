import React from 'react';
import PropTypes from 'prop-types';
import MovieFooterItem from './MovieFooterItem';

const baseMovieUrl = "https://www.themoviedb.org/movie/";

const Movie = ({movie, imageBaseUrl, posterSize, removeMovie, 
  addToTop, addToBottom, moveMovie, orderNumber = null,
  isMovieAdded = false, showOptions = true}) => (

  <div className={'movie card ' + (isMovieAdded ? 'added' : '')}>

    <div className="card-content">

      <div className="media">
        <div className="media-left">
          <img 
            src={imageBaseUrl+posterSize+movie.poster_path} 
            alt={'poster for the movie '+movie.title} />
        </div>
        
        <div className="media-content">
          <div className="content">
            <div className="content-header is-clearfix">

              {orderNumber && (
                <button className="button is-static is-pulled-left"
                style={{
                  marginRight: '0.5rem'
                }}
                >{orderNumber}</button>
              )}

              <h4 className="title is-4 is-marginless">
                <a href={baseMovieUrl+movie.id}>{movie.title}</a>
              </h4>

            </div>
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>

    </div>

    {!isMovieAdded && showOptions && (
      <footer className="card-footer">

        <MovieFooterItem 
          render={typeof addToTop === 'function'} 
          action={() => addToTop(movie)}>
          <span className="icon">
            <i className="fa fa-plus"></i>
          </span>
          top
        </MovieFooterItem>

        <MovieFooterItem 
          render={typeof addToBottom === 'function'}
          action={() => addToBottom(movie)}>
          <span className="icon">
            <i className="fa fa-plus"></i>
          </span>
          bottom
        </MovieFooterItem>

        <MovieFooterItem 
          render={typeof removeMovie === 'function'}
          action={() => removeMovie(movie)}>
          <span className="icon">
            <i className="fa fa-trash-o"></i>
          </span>
        </MovieFooterItem>

        <MovieFooterItem 
          render={typeof moveMovie === 'function'}
          action={() => moveMovie(movie, 'up')}>
          move
          <span className="icon">
            <i className="fa fa-level-up"></i>
          </span>
        </MovieFooterItem>

        <MovieFooterItem 
          render={typeof moveMovie === 'function'}
          action={() => moveMovie(movie, 'down')}>
          move
          <span className="icon">
            <i className="fa fa-level-down"></i>
          </span>
        </MovieFooterItem>

      </footer>
    )}

  </div>
)

Movie.propTypes = {
  movie: PropTypes.object.isRequired,
  imageBaseUrl: PropTypes.string.isRequired,
  posterSize: PropTypes.string.isRequired,
  removeMovie: PropTypes.func,
  addToTop: PropTypes.func,
  addToBottom: PropTypes.func,
  moveMovie: PropTypes.func,
  isMovieAdded: PropTypes.bool,
  showOptions: PropTypes.bool,
  orderNumber: PropTypes.number
};

export default Movie;