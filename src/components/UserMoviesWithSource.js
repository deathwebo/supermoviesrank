import React, {Component} from 'react';
import ResourceMoviesList from './ResourceMoviesList';
import UserMoviesList from './UserMoviesList';
import ResourceMoviesPagination from './ResourceMoviesPagination';

const baseUrl = 'https://api.themoviedb.org/3/';
const apiKey = process.env.REACT_APP_MOVIES_API_KEY;
const today = new Date();

class UserMoviesWithSource extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userMovies: [],
      imageBaseUrl: '',
      posterSize: '',
      resourceMovies: [],
      pages: 1,
      currentPage: 1,
    };
  }

  componentDidMount() {
    this.fetchImagesConfiguration()
    .then(() => {
      this.fetchMoviesFromResource()
      this.getSavedUserMovies();
    });
  }

  componentWillReceiveProps(nextProps) {

    if ( (typeof this.props.profile === "undefined" && nextProps.profile)
      && (this.state.userMovies.length > 0) ) {

      this.getSavedUserMovies()
      .then(savedMovies => {
        console.log('got saved movies', savedMovies);
      });
      // this.saveMovies(nextProps.profile);

    }

  }

  removeMovie(movie) {
    let movies = this.state.userMovies,
        index = movies.indexOf(movie);

    movies.splice(index, 1);

    this.setState({
      userMovies: movies
    }, () => this.saveMovies(this.props.profile));
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
    }, () => this.saveMovies(this.props.profile));
  }

  saveMovies(profile) {
    if (!profile) {
      return;
    }

    let formData = new FormData();

    formData.append('movies', JSON.stringify(this.state.userMovies));

    return fetch('http://localhost:8000/api/movies/'+profile.googleId, {
      method: 'post',
      body: formData,
    });
  }

  getSavedUserMovies() {

    if (!this.props.profile) {
      return;
    }

    let promise = fetch('http://localhost:8000/api/movies/'+this.props.profile.googleId);

    promise.then(response => response.json())
    .then(data => {

      if (data.result.length === 0) {
        console.log('about to reject');

        return;
      }

      this.setState({
        'userMovies': data.result
      });

      return data.result;
    });

    return promise;
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
    }, () => this.saveMovies(this.props.profile));
  }

  addMovieToBottom(movie) {
    let userMovies = this.state.userMovies;

    if (userMovies.indexOf(movie) !== -1)  {
      return;
    }

    userMovies.push(movie);

    this.setState({
      userMovies: userMovies
    }, () => this.saveMovies(this.props.profile));
  }

  render() {

    return (
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
    )
  }
}

export default UserMoviesWithSource;