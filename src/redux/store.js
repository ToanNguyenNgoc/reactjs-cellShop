import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

const rootReducer={
      carts: cartReducer
}
const store = configureStore({
      reducer: rootReducer
})
export default store;