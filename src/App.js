import React, { Component } from 'react';
import cookie from 'react-cookies';

// Our own custom components
import Header from './components/Header';
import ResourceMoviesList from './components/ResourceMoviesList';
import UserMoviesList from './components/UserMoviesList';
import ResourceMoviesPagination from './components/ResourceMoviesPagination';

import './App.css';

const baseUrl = 'https://api.themoviedb.org/3/';
const apiKey = process.env.REACT_APP_MOVIES_API_KEY;
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
      filter: '',
      token: cookie.load('token'),
      profile: cookie.load('profile'),
      isLoadingList: true
    };
  }

  componentDidMount() {
    this.fetchImagesConfiguration()
    .then(() => this.fetchMoviesFromResource());

    this.getSavedUserMovies();

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

    this.setState({
      isLoadingList: true
    });

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
        resourceMovies: data.results,
        isLoadingList: false
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
    }, () => this.saveMovies());
  }

  addMovieToBottom(movie) {
    let userMovies = this.state.userMovies;

    if (userMovies.indexOf(movie) !== -1)  {
      return;
    }

    userMovies.push(movie);

    this.setState({
      userMovies: userMovies
    }, () => this.saveMovies());
  }

  removeMovie(movie) {
    let movies = this.state.userMovies,
        index = movies.indexOf(movie);

    movies.splice(index, 1);

    this.setState({
      userMovies: movies
    }, () => this.saveMovies());
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
    }, () => this.saveMovies());
  }

  saveMovies() {
    if (!this.state.profile) {
      return;
    }

    let formData = new FormData();

    formData.append('movies', JSON.stringify(this.state.userMovies));

    fetch('http://localhost:8000/api/movies/'+this.state.profile.googleId, {
      method: 'post',
      body: formData,
    });
  }

  getSavedUserMovies(fromLogin = false) {
    if (!this.state.profile) {
      return;
    }

    fetch('http://localhost:8000/api/movies/'+this.state.profile.googleId)
    .then(response => response.json())
    .then(data => {

      if (data.result.length == 0) {

        if (fromLogin && this.state.userMovies.length > 0) {
          this.saveMovies();
        }

        return;
      }

      this.setState({
        'userMovies': data.result
      });
    });
  }

  filterMovies(filter) {
    this.setState({
      filter: filter
    });
  }

  onGoogleLoginSuccess(response) {
    cookie.save('profile', response.profileObj);
    cookie.save('token', response.tokenObj);
    
    this.setState({
      profile: response.profileObj,
      token: response.tokenObj
    });

    this.getSavedUserMovies();
  }

  render() {
    return (
      <div className="App">

        <Header 
          onGoogleLoginSuccess={response => this.onGoogleLoginSuccess(response)} 
          token={this.state.token}
          profile={this.state.profile} />

        <section className="section">
          <ResourceMoviesPagination
            pages={this.state.pages}
            currentPage={this.state.currentPage}
            changePage={page => this.changePage(page)}
          />

          <div className="moviesListings columns is-mobile">

            <div className="resourcesMovies column is-half">
              <ResourceMoviesList 
                imageBaseUrl={this.state.imageBaseUrl}
                posterSize={this.state.posterSize}
                addToTop={movie => this.addMovieToTop(movie)}
                addToBottom={movie => this.addMovieToBottom(movie)}
                filter={this.state.filter}
                movies={this.state.resourceMovies} 
                userMovies={this.state.userMovies} />
            </div>

            <div className="userMovies column is-half">
              <UserMoviesList 
                imageBaseUrl={this.state.imageBaseUrl}
                posterSize={this.state.posterSize}
                removeMovie={movie => this.removeMovie(movie)}
                moveMovie={(movie, direction) => this.moveMovie(movie, direction)}
                movies={this.state.userMovies} />
            </div>
          </div>

          <ResourceMoviesPagination
            pages={this.state.pages}
            currentPage={this.state.currentPage}
            changePage={page => this.changePage(page)}
          />

        </section>

      </div>
    );
  }
}

export default App;
