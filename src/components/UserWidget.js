import React from 'react';
import GoogleLogin from 'react-google-login';

const UserWidget = ({Profile, Token, responseGoogle, clientId}) => (
  <GoogleLogin
    clientId={clientId}
    buttonText="Login"
    onSuccess={response => responseGoogle(response)}
  />
)

export default UserWidget;