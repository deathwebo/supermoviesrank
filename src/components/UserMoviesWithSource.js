import React, {Component} from 'react';
import ResourceMoviesList from './ResourceMoviesList';
import UserMoviesList from './UserMoviesList';
import ResourceMoviesPagination from './ResourceMoviesPagination';

const apiUrl = process.env.REACT_APP_BACKEND_API_URL;
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
      this.getSavedUserMovies(this.props.profile);
    });
  }

  componentWillReceiveProps(nextProps) {

    if ( (typeof this.props.profile === "undefined" && nextProps.profile)
      && (this.state.userMovies.length > 0) ) {

      let promise = this.getSavedUserMovies(nextProps.profile);

      promise.then(movies => {
        if (movies.length === 0) {
          this.saveMovies(nextProps.profile);
        }
      });
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

    return fetch(apiUrl+'/api/movies/'+profile.googleId, {
      method: 'post',
      body: formData,
    });
  }

  getSavedUserMovies(profile) {

    if (!profile) {
      return;
    }

    return fetch(apiUrl+'/api/movies/'+profile.googleId)
    .then(response => response.json())
    .then(data => {

      if (data.result.length === 0) {
        return [];
      }

      this.setState({
        'userMovies': data.result
      });

      return data.result;
    });
  }

  fetchImagesConfiguration() {
    let url = baseUrl + 'configuration?api_key=' + apiKey;

    return fetch(url)
    .then(response => response.json())
    .then(data => {
      this.setState({
        imageBaseUrl: data.images.secure_base_url,
        posterSize: data.images.poster_sizes[0]
      });
    });
  }

  fetchMoviesFromResource() {

    let todayRawString = today.toISOString(),
        url = baseUrl + 'discover/movie'
    + '?api_key=' + apiKey
    + '&with_keywords=9715|8828|849'
    + '&without_genres=16|10770|99'
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

      <div className="moviesListings columns">

        <div className="resourcesMovies column">

          <h1 className="title">Available superhero movies</h1>
          <h2 className="subtitle">Browse all the released superhero movies to date, and add them to your list!</h2>

          <ResourceMoviesPagination
            pages={this.state.pages}
            currentPage={this.state.currentPage}
            changePage={page => this.changePage(page)}
          />

          <ResourceMoviesList 
            imageBaseUrl={this.state.imageBaseUrl}
            posterSize={this.state.posterSize}
            addToTop={movie => this.addMovieToTop(movie)}
            addToBottom={movie => this.addMovieToBottom(movie)}
            movies={this.state.resourceMovies} 
            userMovies={this.state.userMovies} />

          <ResourceMoviesPagination
            pages={this.state.pages}
            currentPage={this.state.currentPage}
            changePage={page => this.changePage(page)}
          />
        </div>

        <div className="userMovies column">
          <h1 className="title">Your superhero movies list</h1>
          <h2 className="subtitle">
            Build your own list, 
            you can move them up and down your list to build the perfect <strong>superhero movie tier list</strong>
          </h2>

          <UserMoviesList 
            imageBaseUrl={this.state.imageBaseUrl}
            posterSize={this.state.posterSize}
            removeMovie={movie => this.removeMovie(movie)}
            moveMovie={(movie, direction) => this.moveMovie(movie, direction)}
            movies={this.state.userMovies} />
        </div>
      </div>

    </section>
    )
  }
}

export default UserMoviesWithSource;