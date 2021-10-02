import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {AuthContextClient} from '../../../context/AuthContextClient'
import { addDocument } from '../../../firebase/services';
import './Cart.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router';
import { db } from '../../../firebase/config';
import {allClearCart} from '../../../redux/cartSlice';
import {useDispatch} from 'react-redux'

CartOrder.propTypes = {
      cartsItem:PropTypes.array,
      totalAmount:PropTypes.number,
      orderSuccess:PropTypes.func
};
CartOrder.defaultProps ={
      cartsItem:[],
      totalAmount:0,
      orderSuccess:null
}
const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();
//console.log(`${day}/${month}/${year}`)

function CartOrder(props) {
      const history = useHistory();
      const dispatch = useDispatch();
      const {cartsItem, totalAmount} = props;
      const {user:{uid}} = useContext(AuthContextClient);
      const initialValues={
            customerName:'',
            phoneNumber:'',
            customerAddress:'',
            customerNote:''
      }
      const [values, setValues] = useState(initialValues);
      const handleInputChange=(e)=>{
            var {name, value} = e.target;
            setValues({
                  ...values,
                  [name]: value
            })
      }
      const handleOnsubmit=(e)=>{
            e.preventDefault();
            try {
                  if(uid){
                        addDocument('orders', {
                              uid: uid,
                              customerName: values.customerName,
                              phone: values.phoneNumber,
                              address: values.customerAddress,
                              note: values.customerNote,
                              orderDetail: cartsItem,
                              totalAmount: totalAmount,
                              isCheckout: false,
                              isDelivery: false,
                              orderDate: `${day}/${month}/${year}`
                        })
                        setValues({...initialValues});
                        toast.success('Đặt hàng thành công !');
                        history.push("/Home/Order-success");
                        dispatch(allClearCart());
                        //update product quantity, product total sold (dashboard) when user order
                        cartsItem.forEach(item => {
                              const id = item.id
                              
                              db.collection('product').doc(id).get().then(doc => {
                                    const product = doc.data();
                                    const quantity = product.quantity;
                                    const totalSold = product.totalSold
                                    db.collection('product').doc(id).update({
                                          quantity: quantity - item.cartQuantity,
                                          totalSold: totalSold + item.cartQuantity
                                    })
                              })
                        })

                  }else{
                        toast.warn('Vui lòng đăng nhập trước khi đặt hàng !');
                  }
            }catch{
                  toast.error('Có lỗi trong quá trình đặt hàng !');
            }
      }
      return (
            <div className="form-order">
                  <h2>Thông tin mua hàng</h2>
                  <form autoComplete="off" onSubmit={handleOnsubmit}>
                        <input name="customerName" value={values.customerName} onChange={handleInputChange} type="text" placeholder="Họ và tên người nhận (bắt buộc)" required />
                        <input name="phoneNumber" value={values.phoneNumber} onChange={handleInputChange} type="text" placeholder="Số điện thoại đặt hàng (bắt buộc)" required />
                        <input name="customerAddress" value={values.customerAddress} onChange={handleInputChange} type="text" placeholder="Địa chỉ nhận hàng (bắt buộc)" required />
                        <textarea name="customerNote" value={values.customerNote} onChange={handleInputChange} type="text" placeholder="Lưu ý thêm của khách hàng"></textarea>
                        <button
                              type="submit"
                              style={{ background: 'linear-gradient(#f52f32,#e11b1e)' }}
                              className="cus-buy__btn order-btn">
                              <p style={{ marginBottom: '0px' }}>Đặt hàng và thanh toán sau</p>
                              <span>(Trả tiền tại nhà hoặc tại cửa hàng)</span>
                        </button>
                  </form>
                  <ToastContainer/>
            </div>
      );
}

export default CartOrder;