import React from 'react';
import {getPageCount} from "../../utils/pages";
import {usePagination} from "../hooks/usePagination";

const Pagination = ({totalPages, page, changePage}) => {


    const pageArray = usePagination(totalPages)
    return (
        <div className='page__wrapper'>
          {pageArray.map(p =>
                  <span
                      onClick={() => changePage(p)}
                      key={p}
                      className={page === p ? 'page page__current' : 'page'}
                  >
            {p}
        </span>
          )}
        </div>
    );


};

export default Pagination;