import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import './ProductItem.css'
import { formatPrice } from '../../../commons/formatPrice';
import useFirestore from '../../../customHooks/useFirestore';

ProductItem.propTypes = {
      product: PropTypes.object
};
ProductItem.defaultProps={
      product:{}
}

function ProductItem(props) {
      const {product} = props;
      const history = useHistory();
      const gotoProductDetailPage=()=>{
            const url= `/Home/Product-detail/${product.id}`;
            history.push(url);
            document.body.scrollTop=0;
            document.documentElement.scrollTop=0;
      }
      //get count review text by product id
      const condition  = useMemo(()=>({
            fieldName:'productId',
            operator:'==',
            compareValue:product.id
            
      }),[product.id])
      const reviewByProductId = useFirestore('reviews', condition);
      return (
            <li
                  onClick={gotoProductDetailPage}
            >
                  <div className="product-item">
                        {
                              product.sale === true ?
                                    <div className="product-item__percent">
                                          Giảm {product.percent}%
                                    </div> : ''
                        }
                        <div className="product-item__img-box">
                              <img src={product.productImage} alt="" />
                        </div>
                        <span className="product-item__name">
                              {product.productName}
                        </span>
                        <span className="product-item__price">
                              <span className="product-item__price--sale">
                                    {formatPrice.format(product.discount)}
                              </span>
                              {
                                    product.sale === true ?
                                          <span className="product-item__price--old">
                                                {formatPrice.format(product.price)}
                                          </span> : ''
                              }
                        </span>
                        <span className="product-item__cmt">
                              {reviewByProductId.length} đánh giá
                        </span>
                  </div>
            </li>
      );
}

export default ProductItem;