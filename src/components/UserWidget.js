import React from 'react';
import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';
import User from './User';

const UserWidget = ({profile, responseGoogle, clientId}) => {

  if (profile) {
    return ( <User profile={profile} /> );
  }

  return (
    <GoogleLogin
      clientId={clientId}
      onSuccess={response => responseGoogle(response)}
    >
      <span>Sign in with </span>
      <span className="icon">
        <i className="fa fa-google"></i>
      </span>
    </GoogleLogin>
  );
}

UserWidget.propTypes = {
  profile: PropTypes.object,
  responseGoogle: PropTypes.func.isRequired,
  clientId: PropTypes.string.isRequired
};

export default UserWidget;