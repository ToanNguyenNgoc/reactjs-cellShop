import React, { useMemo } from 'react';
import { useParams } from 'react-router';
import useFirestore from '../../../customHooks/useFirestore';
import {Container} from 'react-bootstrap'
import MyOrdersItem from './MyOrdersItem';
import Footer from '../footer/Footer'

function MyOrders(props) {
      const {uid} = useParams();
      //get all order by uid
      const condition = useMemo(()=>({
            fieldName:'uid',
            operator:'==',
            compareValue:uid
      }),[uid])
      const myOrdersList = useFirestore('orders', condition);
      return (
            <div className="cl-cart">
                  <Container className="cart-container">
                        {
                              myOrdersList.length === 0 ?
                                    <div className="cart-null">
                                          <p>Bạn chưa đặt, mua sản phẩm nào</p>
                                    </div>
                                    :
                                    <div className="cart-detail">
                                          <div className="cart-detail__list">
                                          <div className="cart-detail__header">
                                                      <span className="cart-detail__header--left">
                                                            Lịch sử đặt hàng của bạn
                                                      </span>
                                                </div>
                                          </div>
                                          <div className="cart-detail__content">
                                               <ul>
                                                     {
                                                            myOrdersList?.map(item => (
                                                                  <MyOrdersItem 
                                                                        key={item.id}
                                                                        order={item}
                                                                  />
                                                            ))
                                                     }
                                               </ul>
                                          </div>
                                    </div>
                        }
                  </Container>
                  <Footer/>
            </div>
      );
}

export default MyOrders;