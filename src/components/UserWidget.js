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
      buttonText="Login"
      onSuccess={response => responseGoogle(response)}
    />
  );
}

UserWidget.propTypes = {
  profile: PropTypes.object.isRequired,
  responseGoogle: PropTypes.func.isRequired,
  clientId: PropTypes.string.isRequired
};

export default UserWidget;