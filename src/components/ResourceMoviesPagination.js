import React from 'react';
import PropTypes from 'prop-types';

const ResourceMoviesPagination = ({pages, currentPage, changePage}) => {

  const onClickHandler = (e, page) => {
    changePage(page);

    e.preventDefault();
  };

  return (
  <div className="ResourceMoviesPagination">
    <ul className="pagination">
    {Array.from(new Array(pages),(val,index) => {
      let actualPage = index + 1;
      return (
        <li key={index}>
          { actualPage === currentPage 
            ? actualPage 
            : <a href="#page" 
              onClick={(event, page) => onClickHandler(event, actualPage)}
              >{actualPage}</a>
          }
        </li>
      );
    })}
    </ul>
  </div>
  );
}

ResourceMoviesPagination.propTypes = {
  pages: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired
};

export default ResourceMoviesPagination;