import React from 'react';
import PropTypes from 'prop-types';

/**
Profile {
  email    
  familyName
  givenName
  googleId
  imageUrl
  name
}
*/

const User = ({ profile }) => (
  <div className="userProfile">
    <span className="name">{profile.name}</span>
    <img src={profile.imageUrl} alt="profile imageUrl" />
  </div>
)

User.propTypes = {
  profile: PropTypes.object.isRequired
};

export default User;