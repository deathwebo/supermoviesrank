import React, {Component} from 'react';
import UserMoviesList from './UserMoviesList';

const baseUrl = 'https://api.themoviedb.org/3/';
const apiKey = process.env.REACT_APP_MOVIES_API_KEY;

class UserMovies extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userMovies: [],
      imageBaseUrl: '',
      posterSize: '',
      resourceMovies: [],
      noDataFound: true
    };
  }

  componentDidMount() {
    this.fetchImagesConfiguration()
    .then(() => this.getSavedUserMovies());
  }

  getSavedUserMovies() {
    if (!this.props.userId) {
      return;
    }

    fetch('http://localhost:8000/api/movies/'+this.props.userId)
    .then(response => response.json())
    .then(data => {

      if (data.result.length === 0) {

        return;
      }

      this.setState({
        'userMovies': data.result,
        'noDataFound': false
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

  render() {

    if (this.state.noDataFound) {
      return (
        <section className="hero is-danger is-medium is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Oooops!
              </h1>
              <h2 className="subtitle">
                No data found in here
              </h2>
            </div>
          </div>
        </section>
      )
    }


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