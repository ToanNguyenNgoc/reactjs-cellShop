import React from 'react';
import PropTypes from 'prop-types';
import ProductItem from '../productItem/ProductItem';
import './HomeContent.css';

HomeContentTopSold.propTypes = {
      products:PropTypes.array
};
HomeContentTopSold.defaultProps={
      products:[]
}

function HomeContentTopSold(props) {
      const {products} = props;
      const productSale = products.sort((a, b)=> b.totalSold - a.totalSold);
      const productTop5 = productSale.slice(0,6);
      return (
            <div className="content-sale">
                  <div className="content-sale__header">
                        <strong>TOP SẢN PHẨM ĐANG BÁN CHẠY</strong>
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

export default HomeContentTopSold;