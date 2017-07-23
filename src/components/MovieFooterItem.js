import React from 'react';
import PropTypes from 'prop-types';

const MovieFooterItem = (props) => {
  let { action, render } = props;

  if (!render) {
    return null;
  }

  return <a className="card-footer-item" onClick={action}>
    {props.children}
  </a>;
}

MovieFooterItem.propTypes = {
  action: PropTypes.func,
  actionArguments: PropTypes.array
};

export default MovieFooterItem;