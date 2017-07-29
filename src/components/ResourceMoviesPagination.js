import React from 'react';
import PropTypes from 'prop-types';

const ResourceMoviesPagination = ({pages, currentPage, changePage}) => {

  const onClickHandler = (e, page) => {
    changePage(page);

    e.preventDefault();
  };

  let style = {
    marginBottom: '1rem'
  };

  return (
  <nav className="ResourceMoviesPagination pagination" style={style}>
    <ul className="pagination-list">
    {Array.from(new Array(pages),(val,index) => {
      let actualPage = index + 1,
          isCurrent = (actualPage === currentPage);

      return (
        <li key={index}>
          <a href="#page" 
            onClick={(event, page) => onClickHandler(event, actualPage)}
            className={'pagination-link ' + (isCurrent ? 'is-current' : '') }
          >{actualPage}</a>
        </li>
      );
    })}
    </ul>
  </nav>
  );
}

ResourceMoviesPagination.propTypes = {
  pages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired
};

export default ResourceMoviesPagination;