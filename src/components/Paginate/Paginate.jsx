import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useEffect } from 'react/cjs/react.development';
import './paginate.css'

function Paginate({ updatePage, repoCount, repoPerPage }) {
  const calcPageCount = () => {
    return repoPerPage !== 0 ? Math.ceil(repoCount / repoPerPage) : 0;
  }

  const [pageCount, setPageCount] = useState(calcPageCount());

  const handlePageClick = (data) => {
    updatePage(data.selected + 1);
  }

  useEffect(() => {
    setPageCount(calcPageCount());
  }, [repoCount])

  return (
    < ReactPaginate
      previousLabel='< Previous'
      nextLabel='Next >'
      breakLabel='...'
      pageCount={pageCount}
      marginPagesDisplayed={3}
      pageRangeDisplayed={3}
      onPageChange={handlePageClick}
      containerClassName='pagination'
      pageClassName='page-item'
      previousClassName='page-item'
      nextClassName='page-item'
      breakClassName='page-item'
      activeClassName='active'
    />
  );
}

export default Paginate;