import React from 'react';
import { observer } from 'mobx-react';
import ReactPaginate from 'react-paginate';
import Paper from '@material-ui/core/Paper';

import './FOPagination.scss';


const pageChangeHandler = onPageChange => selectedPage => onPageChange(selectedPage.selected + 1);

interface IFOPaginationOwnProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const FOPagination = observer(({ pageCount, onPageChange, currentPage }: IFOPaginationOwnProps) => (
  <div className='fo-pagination'>
    <Paper>
      <ReactPaginate
        previousLabel='<'
        nextLabel='>'
        breakLabel='...'
        pageCount={pageCount}
        initialPage={currentPage - 1}
        forcePage={currentPage - 1}
        marginPagesDisplayed={1}
        pageRangeDisplayed={1}
        disableInitialCallback
        pageLinkClassName='fo-pagination__page-link'
        previousLinkClassName='fo-pagination__page-link'
        nextLinkClassName='fo-pagination__page-link'
        containerClassName='fo-pagination__container'
        activeClassName='fo-pagination--active'
        onPageChange={pageChangeHandler(onPageChange)}
      />
    </Paper>
  </div>
));

export default FOPagination;
