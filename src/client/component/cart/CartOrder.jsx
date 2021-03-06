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
                        toast.success('?????t h??ng th??nh c??ng !');
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
                        toast.warn('Vui l??ng ????ng nh???p tr?????c khi ?????t h??ng !');
                  }
            }catch{
                  toast.error('C?? l???i trong qu?? tr??nh ?????t h??ng !');
            }
      }
      return (
            <div className="form-order">
                  <h2>Th??ng tin mua h??ng</h2>
                  <form autoComplete="off" onSubmit={handleOnsubmit}>
                        <input name="customerName" value={values.customerName} onChange={handleInputChange} type="text" placeholder="H??? v?? t??n ng?????i nh???n (b???t bu???c)" required />
                        <input name="phoneNumber" value={values.phoneNumber} onChange={handleInputChange} type="text" placeholder="S??? ??i???n tho???i ?????t h??ng (b???t bu???c)" required />
                        <input name="customerAddress" value={values.customerAddress} onChange={handleInputChange} type="text" placeholder="?????a ch??? nh???n h??ng (b???t bu???c)" required />
                        <textarea name="customerNote" value={values.customerNote} onChange={handleInputChange} type="text" placeholder="L??u ?? th??m c???a kh??ch h??ng"></textarea>
                        <button
                              type="submit"
                              style={{ background: 'linear-gradient(#f52f32,#e11b1e)' }}
                              className="cus-buy__btn order-btn">
                              <p style={{ marginBottom: '0px' }}>?????t h??ng v?? thanh to??n sau</p>
                              <span>(Tr??? ti???n t???i nh?? ho???c t???i c???a h??ng)</span>
                        </button>
                  </form>
                  <ToastContainer/>
            </div>
      );
}

export default CartOrder;