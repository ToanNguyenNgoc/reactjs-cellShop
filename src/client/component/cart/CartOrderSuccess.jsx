import React from 'react';
import {Container} from 'react-bootstrap';
import './Cart.css';
import {useHistory} from 'react-router-dom';
import Footer from '../footer/Footer'

function CartOrderSuccess(props) {
      const history = useHistory();
      const backHomeClick=()=>{
            history.push("/Home")
      }
      return (
            <div className="cl-cart">
                  <Container className="cart-container">
                        <div className="cart-detail order-success">
                              <i className="fas fa-check-circle"></i>
                              <h3>Cảm ơn bạn đã đặt mua hàng, nhân viên sẽ liên hệ lại với bạn qua số điện thoại</h3>
                              <button onClick={backHomeClick}>
                                    <i className="fas fa-arrow-left"></i>
                                    Quay lại trang chủ
                              </button>
                        </div>
                  </Container>
                  <Footer/>
            </div>
      );
}

export default CartOrderSuccess;