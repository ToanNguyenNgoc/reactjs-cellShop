import {createSlice} from '@reduxjs/toolkit';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState={
      cartItems:localStorage.getItem('cartCellShop') ? JSON.parse(localStorage.getItem('cartCellShop')) : [],
      cartTotalQuantity:0,
      cartTotalAmount:0
}
const cart= createSlice({
      name:'carts',
      initialState,
      reducers:{
            addCart:(state, action)=>{
                  const itemIndex = state.cartItems.findIndex((item)=>
                        item.id === action.payload.id
                  )
                  if (itemIndex >= 0) {
                        if (state.cartItems[itemIndex].productQuantity > state.cartItems[itemIndex].cartQuantity) {
                              state.cartItems[itemIndex].cartQuantity += 1;
                        }else{
                              toast.warn('Xin lỗi ! Bạn không thể đặt mua nhiều hơn số lượng sản phẩm có sẵn trong cửa hàng !')
                        }
                  } else {
                        const tempProduct = { ...action.payload, cartQuantity: 1 }
                        state.cartItems.push(tempProduct);
                  }
                  localStorage.setItem('cartCellShop', JSON.stringify(state.cartItems))
            },
            removeCart:(state, action)=>{
                  const nextCartItems = state.cartItems.filter(
                        cartItem => cartItem.id !== action.payload.id
                  )
                  state.cartItems = nextCartItems;
                  localStorage.setItem('cartCellShop', JSON.stringify(nextCartItems))
            },
            descCart:(state, action)=>{
                  const itemIndex = state.cartItems.findIndex(
                        item => item.id === action.payload.id
                  )
                  if(state.cartItems[itemIndex].cartQuantity > 1){
                        state.cartItems[itemIndex].cartQuantity -= 1;
                  }else if(state.cartItems[itemIndex].cartQuantity === 1){
                        const nextCartItems = state.cartItems.filter(
                              cartItem => cartItem.id !== action.payload.id
                        )
                        state.cartItems = nextCartItems;
                  }
                  localStorage.setItem('cartCellShop', JSON.stringify(state.cartItems))
            },
            allClearCart:(state, action)=>{
                  state.cartItems=[];
                  localStorage.setItem('cartCellShop', JSON.stringify(state.cartItems));
            },
            getTotals:(state, action)=>{
                  let {total, quantity} = state.cartItems.reduce(
                        (cartTotal, cartItem) =>{
                              const {salePrice, cartQuantity} = cartItem;
                              const itemTotal = salePrice * cartQuantity;

                              cartTotal.total += itemTotal;
                              cartTotal.quantity += cartQuantity;
                              return cartTotal;
                        },
                        {
                              total:0, quantity:0
                        }
                  )
                  state.cartTotalQuantity = quantity;
                  state.cartTotalAmount = total;
            }
      }
})
const {reducer, actions} = cart;
export const {addCart, removeCart, descCart, allClearCart, getTotals} = actions;
export default reducer;