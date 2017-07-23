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
  <div className="userProfile columns is-mobile">

    <div className="column is-narrow">
      <strong className="name is-success">{profile.name}</strong>
    </div>

    <div className="column is-narrow">
      <figure className="image is-32x32">
        <img src={profile.imageUrl} alt="profile imageUrl" />
      </figure>
    </div>

  </div>
)

User.propTypes = {
  profile: PropTypes.object.isRequired
};

export default User;