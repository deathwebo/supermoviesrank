import React from 'react';
import UserWidget from './UserWidget';
import ShareList from './ShareList';
import About from './About';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const Header = ({ onGoogleLoginSuccess, token, profile }) => (
  <nav className="navbar">

    <div className="navbar-brand">
      <a href="/" className="navbar-item">
        <span className="icon">
          <i className="fa fa-superpowers"></i>
        </span>
        <span className="icon">
          <i className="fa fa-film"></i>
        </span>
        <span className="tag is-primary is-medium">SuperMovies Rank</span>
      </a>
    </div>

    <div className="navbar-menu is-active">

      <div className="navbar-start">
        <ShareList profile={profile} />
        <About />
      </div>

      <div className="navbar-end">

        <div className="navbar-item">
          <UserWidget 
            responseGoogle={response => onGoogleLoginSuccess(response)} 
            token={token}
            profile={profile}
            clientId={clientId}
          />
        </div>

      </div>

    </div>
  </nav>
)

export default Header;