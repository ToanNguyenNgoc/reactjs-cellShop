import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './HomeContent.css'
import ProductItem from '../productItem/ProductItem';

HomeContentHotSale.propTypes = {
      products:PropTypes.array
};
HomeContentHotSale.defaultProps={
      products:[]
}

function HomeContentHotSale(props) {
      const {products} = props;
      const [viewMore, setViewMore] = useState(6);
      const [hide, setHide] = useState('block')
      const productSale = products.sort((a, b)=> b.percent - a.percent);
      const handleViewMore=()=>{
            setViewMore(12);
            setHide('none');
      }
      const productTop5 = productSale.slice(0,viewMore);
      return (
            <div className="content-sale">
                  <div className="content-sale__header">
                        <strong>HOT <img src="https://cellphones.com.vn/media/icon/flash.gif" alt="" /> SALE</strong>
                        <button style={{display: hide}} onClick={handleViewMore}>Xem thêm</button>
                  </div>
                  <div className="content-sale__product">
                        <div className="product-similar__wrapper">
                              <ul>
                                    {
                                          productTop5.map(product => (
                                                <ProductItem
                                                      key={product.id}
                                                      product={product}
                                                />
                                          ))
                                    }
                              </ul>
                        </div>
                  </div>
            </div>
      );
}

export default HomeContentHotSale;