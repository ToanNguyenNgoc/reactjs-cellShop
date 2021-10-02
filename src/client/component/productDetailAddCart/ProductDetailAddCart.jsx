import React  from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {addCart} from '../../../redux/cartSlice';
import {useHistory} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
ProductDetailAddCart.propTypes = {
      product:PropTypes.object,
      id:PropTypes.string
};
ProductDetailAddCart.defaultProps={
      product:{},
      id:''
}

function ProductDetailAddCart(props) {
      const history =useHistory();
      const dispatch = useDispatch();
      const {product, id} = props;

       const values=({
                  id:id,
                  productName: product.productName,
                  productImage: product.productImage,
                  salePrice: product.discount,
                  cartQuantity: 1,
                  productQuantity: product.quantity
            })
      const handleAddCart =()=>{
            const action = addCart(values);
            dispatch(action);
            toast.success(`Đã thêm ${product.productName} vào giỏ hàng !`);
      }
      const handleBuyNow=()=>{
            const action = addCart(values);
            dispatch(action);
            history.push("/Home/Cart");
      }
      return (
            <div className="product-detail__right__button">
                  <button
                        onClick={handleBuyNow}
                        style={{ background: 'linear-gradient(#f52f32,#e11b1e)' }}
                        className="cus-buy__btn"     
                  >
                        <p style={{ marginBottom: '0px'}}>Mua ngay</p>
                        <span>(Giao nhanh tận nhà)</span>
                  </button>
                  <button onClick={handleAddCart} className="cus-buy__btn add-cart__btn">
                        <p style={{ marginBottom: '0px' }}>Thêm vào giỏ hàng</p>
                  </button>
                  <ToastContainer/>
            </div>
      );
}

export default ProductDetailAddCart;