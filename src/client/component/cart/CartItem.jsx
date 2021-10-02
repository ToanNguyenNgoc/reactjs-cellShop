import React from 'react';
import PropTypes from 'prop-types';
import {formatPrice} from '../../../commons/formatPrice';
import {useHistory} from 'react-router-dom'

CartItem.propTypes = {
      handleDesc: PropTypes.func,
      handleAsc: PropTypes.func,
      handleRemoveItem: PropTypes.func,
      item:PropTypes.object
};
CartItem.defaultProps={
      handleDesc:null,
      handleAsc:null,
      handleRemoveItem:null,
      item:{}
}

function CartItem(props) {
      const {handleDesc, handleAsc, handleRemoveItem, item} =props;
      const history = useHistory();
      const handleRemoveItemClick=(item)=>{
            if(handleRemoveItem){
                  handleRemoveItem(item);
            }
      }
      const handleDescCartItemClick=(item)=>{
            if(handleDesc){
                  handleDesc(item)
            }
      }
      const handleAscCartItemClick=(item)=>{
            if(handleAsc){
                  handleAsc(item)
            }
      }
      const gotoProductDetailPage=(id)=>{
            history.push(`/Home/Product-detail/${id}`)
      }
      return (
            <li>
                  <div className="cart-detail__content--item">
                        <img src={item.productImage} alt="" />
                        <div className="content--item__right">
                              <div className="content--item__right--detail">
                                    <span onClick={()=>gotoProductDetailPage(item.id)} className="content--item__name">{item.productName}</span>
                                    <span className="content--item__price">{formatPrice.format(item.salePrice)}</span>
                                    <p>-Khuyến mãi hàng</p>
                              </div>
                              <div className="content--item__right--control">
                                    <span onClick={() => handleRemoveItemClick(item)} className="right--control__delete">Xóa khỏi giỏ</span>
                                    <div className="right--control__button">
                                          <button onClick={() => handleDescCartItemClick(item)}>-</button>
                                          <div><p>{item.cartQuantity}</p></div>
                                          <button onClick={() => handleAscCartItemClick(item)}>+</button>
                                    </div>
                                    <span className="right--control__total">
                                          {formatPrice.format(item.cartQuantity * item.salePrice)}
                                    </span>
                              </div>
                        </div>
                  </div>
            </li>
      );
}

export default CartItem;