import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../../commons/formatDate';
import {formatPrice} from '../../../commons/formatPrice'
import './MyOrders.css'

MyOrdersItem.propTypes = {
      order: PropTypes.object
};
MyOrdersItem.defaultProps={
      order:{}
}

function MyOrdersItem(props) {
      const {order} = props;
      return (
            <li className="my-order">
                  <div className="my-order__info">
                        <div className="my-order__info--header">
                              <span>Mã đơn hàng :{order.id}</span>
                              <span>Ngày đặt :{formatDate(order.createdAt?.seconds)}</span>
                        </div>
                        <div className="my-order__info--status">
                              <span>- Trạng thái đơn hàng :<h4>{ order.isCheckout === false ? 'Đang chờ xác nhận...':'Đã xác nhận' }</h4></span>
                              <span>- Trạng thái giao hàng :<h4>{order.isDelivery === false ? 'Chưa giao hàng...':'Đã giao hàng'}</h4></span>
                              <span>- Tổng thanh toán :<h3>{formatPrice.format(order.totalAmount)}</h3></span>
                        </div>
                  </div>
                  <ul className="my-order__detail">
                        {
                              order.orderDetail.map(item =>(
                                    <li className="my-order__detail--it" key={item.id}>
                                          <img className="my-order__detail--img" src={item.productImage} alt="" />
                                          <div className="my-order__detail--item">
                                                <span>{item.productName}</span>
                                                <h4>Đơn giá :{formatPrice.format(item.salePrice)}</h4>
                                                <h4>Sô lượng :{item.cartQuantity}</h4>
                                                <h4>Tổng tiền :{formatPrice.format(item.salePrice * item.cartQuantity)}</h4>
                                          </div>
                                    </li>
                              ))
                        }
                  </ul>
            </li>
      );
}

export default MyOrdersItem;