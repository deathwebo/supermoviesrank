import React from 'react';

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

export default ResourceMoviesPagination;