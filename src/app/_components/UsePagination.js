import React from 'react'
import { Pagination } from '@mui/material';

export default function UsePagination({handleChangePage,page}) {

      return (
        <Pagination className='cat-pagin' count={page} size="large"  onChange={(e, value) => handleChangePage(e, value)}  />
      );
}
