import React,{useContext, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {removeCart, addCart, descCart, getTotals} from '../../../redux/cartSlice';
import {useDispatch} from 'react-redux'
import './Cart.css';
import {Container} from 'react-bootstrap'
import CartItem from './CartItem';
import CartOrder from './CartOrder';
import Footer from '../footer/Footer'
import {formatPrice} from '../../../commons/formatPrice'
import { AuthContextClient } from '../../../context/AuthContextClient';
import { useHistory } from 'react-router';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart(props) {
      const title='Giỏ hàng'
      const dispatch = useDispatch();
      const history = useHistory();
      const carts = useSelector((state) => state.carts);
      const {user:{uid}}  = useContext(AuthContextClient);

      useEffect(()=>{
            document.title=`${title}`
      },[title])

      const handleRemoveItem =(item)=>{
            dispatch(removeCart(item))
      }
      const handleDescCartItem =(item)=>{
            dispatch(descCart(item));
      }
      const handleAscCartItem =(item)=>{
            dispatch(addCart(item));
      }
      // const handleAllClearCartItemClick=()=>{
      //       dispatch(allClearCart());
      // }
      useEffect(()=>{
            dispatch(getTotals());
      },[carts, dispatch])
      //handle go to my orders
      const gotoMyOrdersPage=()=>{
            if(uid){
                  history.push(`/Home/My-orders/${uid}`);
            }else{
                  toast.warn('Bạn cần phải đăng nhập để xem lịch sử đặt hàng !');
            }
      }

      return (
            <div className="cl-cart">
                  <Container className="cart-container">
                        {
                              carts.cartItems.length === 0 ?
                                    <div className="cart-null">
                                          <div className="cart-detail">
                                                <div className="cart-detail__list">
                                                      <div className="cart-detail__header">
                                                            <span onClick={gotoMyOrdersPage} className="cart-detail__header--left">
                                                                  Lịch sử đặt hàng
                                                            </span>
                                                            <h1>Giỏ hàng của bạn</h1>
                                                      </div>
                                                </div>
                                          </div>
                                          <p>Không có sản phẩm nào trong giỏ hàng</p>
                                    </div>
                                    :
                                    <div className="cart-detail">
                                          <div className="cart-detail__list">
                                                <div className="cart-detail__header">
                                                      <span onClick={gotoMyOrdersPage} className="cart-detail__header--left">
                                                            Lịch sử đặt hàng
                                                      </span>
                                                      <h1>Giỏ hàng của bạn</h1>
                                                </div>
                                                <div className="cart-detail__content">
                                                      <ul>
                                                            {
                                                                  carts.cartItems?.map(item => (
                                                                        <CartItem
                                                                              key={item.id}
                                                                              item={item}
                                                                              handleRemoveItem={handleRemoveItem}
                                                                              handleDesc={handleDescCartItem}
                                                                              handleAsc={handleAscCartItem}
                                                                        />
                                                                  ))
                                                            }
                                                      </ul>
                                                </div>
                                                <div className="cart-detail__total-amount">
                                                      <h2>- Tổng thanh toán :</h2>
                                                      <span>{formatPrice.format(carts.cartTotalAmount)}</span>
                                                </div>
                                                <CartOrder
                                                      cartsItem={carts.cartItems}
                                                      totalAmount={carts.cartTotalAmount}
                                                />
                                          </div>
                                    </div>
                        }
                  </Container>
                  <Footer/>
            </div>
      );
}

export default Cart;