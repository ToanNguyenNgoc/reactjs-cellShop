import React from 'react';
import PropTypes from 'prop-types';
import './PaginationDashboard.css'

PaginationDashboard.propTypes = {
      pageNumber: PropTypes.array,
      handlePage: PropTypes.func
};
PaginationDashboard.defaultProps ={
      pageNumber:[],
      handlePage:null
}
function PaginationDashboard(props) {
      const {pageNumber, handlePage} = props;
      const handlePageClick=(number)=>{
            if(handlePage){
                  handlePage(number)
            }
      }
      return (
            <nav aria-label="Page navigation example">
                  <ul className="pagination">
                        {
                              pageNumber.map(number => (
                                    <li className="page-item" key={number}>
                                          <button
                                                className="page-link"
                                                onClick={() => handlePageClick(number)}
                                          >
                                                {number}
                                          </button>
                                    </li>
                              ))
                        }
                  </ul>
            </nav>
      );
}

export default PaginationDashboard;