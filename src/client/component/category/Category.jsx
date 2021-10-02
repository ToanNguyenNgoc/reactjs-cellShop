import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {AppContext} from '../../../context/AppProvider';
import {useHistory} from 'react-router-dom'
import './Category.css'

Category.propTypes = {
      categoryList: PropTypes.array,
      products: PropTypes.array,
};
Category.defaultProps ={
      categoryList:[],
      products:[]
}

function Category(props) {
      const history = useHistory();
      const {categoryList, setCategorySelected} = useContext(AppContext);
      const handleCategoryClick=(id)=>{
            document.body.scrollTop=0;
            document.documentElement.scrollTop=0;
            document.querySelector('.cl-header__category').classList.remove('cl-header__category--active');
            setCategorySelected(id);
            history.push(`/Home/Category/${id}`);
      }
      return (
            <div className="cl-header__category">
                  <ul>
                        {
                             categoryList.map(category => (
                                   <li    
                                          onClick={()=> handleCategoryClick(category.id)}
                                          style={{cursor:'pointer'}}
                                          key={category.id}
                                    >
                                         {category.name}
                                   </li>
                             )) 
                        }
                  </ul>
            </div>
      );
}

export default Category;