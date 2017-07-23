import React, { Component } from 'react';
import cookie from 'react-cookies';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

// Our own custom components
import Header from './components/Header';
import UserMoviesWithSource from './components/UserMoviesWithSource';
import UserMovies from './components/UserMovies';

import './App.css';

class App extends Component {

  constructor(props) {

    super(props);

    this.state = {
      token: cookie.load('token'),
      profile: cookie.load('profile'),
    };
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
    <Router>

      <div className="App">

        <Header 
          onGoogleLoginSuccess={response => this.onGoogleLoginSuccess(response)} 
          token={this.state.token}
          profile={this.state.profile} />

        <Route exact path="/" 
          component={() => (
            <UserMoviesWithSource profile={this.state.profile} />
        )} />

        <Route path="/:id" 
          component={({ match }) => (
            <UserMovies profile={this.state.profile} userId={match.params.id}  />
          )} />

      </div>
    </Router>
    );
  }
}

export default App;
