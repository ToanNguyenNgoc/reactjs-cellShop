import React from 'react';
import PropTypes from 'prop-types';
import PaginationDashboard from '../pagination/PaginationDashboard';

CategoryPagination.propTypes = {
      handleChangePageNumber: PropTypes.func
};
CategoryPagination.defaultProps ={
      handleChangePageNumber:null
}
function CategoryPagination(props) {
      const {categoriesPerPage, totalCategories, handleChangePageNumber} = props;
      const pageNumber=[];
      for(let i=1; i <= Math.ceil(totalCategories / categoriesPerPage); i++){
            pageNumber.push(i);
      }
      const handlePageClick =(number)=>{
            if(handleChangePageNumber){
                  handleChangePageNumber(number);
            }
      }
      return (
            <div>
                  <PaginationDashboard
                        pageNumber={pageNumber}
                        handlePage={handlePageClick}
                  />
            </div>
      );
}

export default CategoryPagination;