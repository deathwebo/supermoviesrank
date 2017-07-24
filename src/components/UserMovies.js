import React, {Component} from 'react';
import UserMoviesList from './UserMoviesList';

const baseUrl = 'https://api.themoviedb.org/3/';
const apiKey = process.env.REACT_APP_MOVIES_API_KEY;
const today = new Date();

class UserMovies extends Component {

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
    .then(() => this.fetchMoviesFromResource());

    this.getSavedUserMovies();
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

  getSavedUserMovies(fromLogin = false) {
    if (!this.props.profile) {
      return;
    }

    fetch('http://localhost:8000/api/movies/'+this.props.profile.googleId)
    .then(response => response.json())
    .then(data => {

      if (data.result.length === 0) {

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

  render() {
    return (
      <section className="section">

        <div className="moviesListings columns is-mobile">

          <div className="userMovies column is-half is-offset-one-quarter">

            <UserMoviesList 
              imageBaseUrl={this.state.imageBaseUrl}
              posterSize={this.state.posterSize}
              removeMovie={movie => this.removeMovie(movie)}
              moveMovie={(movie, direction) => this.moveMovie(movie, direction)}
              movies={this.state.userMovies} 
              showOptions={false} />

          </div>

        </div>

      </section>
    )
  }

}

export default UserMovies;