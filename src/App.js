import React, { Component } from 'react';
import ResourceMoviesFilter from './components/ResourceMoviesFilter';
import ResourceMoviesList from './components/ResourceMoviesList';
import UserMoviesList from './components/UserMoviesList';
import ResourceMoviesPagination from './components/ResourceMoviesPagination';

import './App.css';

const baseUrl = 'https://api.themoviedb.org/3/';
const apiKey = '429dc617412137ebfc29880cd90d1bc6';
const today = new Date();

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      resourceMovies: [],
      userMovies: [],
      pages: 1,
      currentPage: 1,
      imageBaseUrl: '',
      posterSize: '',
      filter: ''
    };
  }

  componentDidMount() {
    this.fetchImagesConfiguration()
    .then(() => this.fetchMoviesFromResource());
  }

  fetchImagesConfiguration() {
    let url = baseUrl + 'configuration?api_key=' + apiKey;

    return fetch(url)
    .then(response => response.json())
    .then(data => {
      this.setState({
        imageBaseUrl: data.images.base_url,
        posterSize: data.images.poster_sizes[0]
      });
    });
  }

  fetchMoviesFromResource() {
    let todayRawString = today.toISOString(),
        url = baseUrl + 'discover/movie'
     + '?api_key=' + apiKey
     + '&with_keywords=9715,9717'
     + '&without_genres=16'
     + '&page='+this.state.currentPage
     + '&release_date.lte='+todayRawString.split("T")[0]
     + '&sort_by=original_title.asc';

    fetch(url)
    .then(response => response.json())
    .then(data => {
      this.setState({
        currentPage: data.page,
        pages: data.total_pages,
        resourceMovies: data.results
      });
    })
    .catch((ex) => {
      console.log('parsing failed', ex)
    });
  }

  changePage(page) {
    this.setState({
      currentPage: page
    }, () => this.fetchMoviesFromResource());
  }

  addMovieToTop(movie) {
    let userMovies = this.state.userMovies;

    if (userMovies.indexOf(movie) !== -1)  {
      return;
    }

    userMovies.unshift(movie);

    this.setState({
      userMovies: userMovies
    });
  }

  addMovieToBottom(movie) {
    let userMovies = this.state.userMovies;

    if (userMovies.indexOf(movie) !== -1)  {
      return;
    }

    userMovies.push(movie);

    this.setState({
      userMovies: userMovies
    });
  }

  removeMovie(movie) {
    let movies = this.state.userMovies,
        index = movies.indexOf(movie);

    movies.splice(index, 1);

    this.setState({
      userMovies: movies
    });
  }

  moveMovie(movie, direction) {
    let movies = this.state.userMovies,
        oldIndex = movies.indexOf(movie),
        index = oldIndex;

    switch(direction) {
      case 'up':
        if (index === 0) return;

        index--;
      break;

      case 'down':
        if (index === movies.length) return;

        index++;
      break;

      default:
       throw new Error("Invalid direction "+ direction);
    }

    movies.splice(oldIndex, 1);

    movies.splice(index, 0, movie);

    this.setState({
      userMovies: movies
    });
  }

  filterMovies(filter) {
    this.setState({
      filter: filter
    });
  }

  render() {
    return (
      <div className="App">
        <ResourceMoviesFilter filterMovies={query => this.filterMovies(query)} />
        <ResourceMoviesPagination
          pages={this.state.pages}
          currentPage={this.state.currentPage}
          changePage={page => this.changePage(page)}
        />
        <div className="moviesListings">
          <div className="resourcesMovies">
            <ResourceMoviesList 
              imageBaseUrl={this.state.imageBaseUrl}
              posterSize={this.state.posterSize}
              addToTop={movie => this.addMovieToTop(movie)}
              addToBottom={movie => this.addMovieToBottom(movie)}
              filter={this.state.filter}
              movies={this.state.resourceMovies} />
          </div>
          <div className="userMovies">
            <UserMoviesList 
              imageBaseUrl={this.state.imageBaseUrl}
              posterSize={this.state.posterSize}
              removeMovie={movie => this.removeMovie(movie)}
              moveMovie={(movie, direction) => this.moveMovie(movie, direction)}
              movies={this.state.userMovies} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
