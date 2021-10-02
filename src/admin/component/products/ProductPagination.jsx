import React from 'react';
import PropTypes from 'prop-types';
import PaginationDashboard from '../pagination/PaginationDashboard';

ProductPagination.propTypes = {
      handleChangePageNumber: PropTypes.func
};
ProductPagination.defaultProps={
      handleChangePageNumber:null
}
function ProductPagination(props) {
      const {productPerPage, totalProduct, handleChangePageNumber} = props;
      const pageNumber=[];
      for(let i=1; i <= Math.ceil(totalProduct / productPerPage); i++){
            pageNumber.push(i);
      }
      const handleChangePageClick=(number)=>{
            if(handleChangePageNumber){
                  handleChangePageNumber(number)
            }
      }
      return (
            <div>
                  <PaginationDashboard
                        pageNumber={pageNumber}
                        handlePage={handleChangePageClick}
                  />
            </div>
      );
}

export default ProductPagination;