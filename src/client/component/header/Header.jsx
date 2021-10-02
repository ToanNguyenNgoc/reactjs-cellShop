import React,{useState, useEffect, useContext} from 'react';
import { auth } from '../../../firebase/config';
import './Header.css'
import {Container} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {getTotals} from '../../../redux/cartSlice';
import {useHistory} from 'react-router-dom'
import { AuthContextClient } from '../../../context/AuthContextClient';
import Search from '../search/Search';
import Category from '../category/Category';
import PopUpLogin from '../popUpLogin/PopUpLogin';
import { ToastContainer } from 'react-toastify';


function Header(props) {
      const carts = useSelector((state) => state.carts);
      const dispatch = useDispatch();
      const history = useHistory();
      const [customerName, setCustomerName] = useState('');
      const [customerPhoto, setCustomerPhoto] = useState('');
      const { user, user: { displayName, photoURL } } = useContext(AuthContextClient);
      const [popUpLoginDialog, setPopUpLoginDialog] = useState(false);
      useEffect(() => {
            async function handleSetCustomer() {
                  if (user) {
                        setCustomerName(displayName);
                        setCustomerPhoto(photoURL)
                  } else {
                        setCustomerName();
                        setCustomerPhoto()
                  }
            }
            handleSetCustomer();
      }, [displayName, photoURL, user])
      const gotoLoginPage = () => {
            setPopUpLoginDialog(true);
      }
      const comebackHome=()=>{
            history.push("/Home")
      }
      const gotoCartPage=()=>{
            history.push("/Home/Cart");
      }
      useEffect(()=>{
            dispatch(getTotals());
      },[carts, dispatch])
      return (
            <div className="cl-header">
                  <Container>
                        <div className="cl-header__icon">
                              <i className="fas fa-bars"></i>
                              <span  onClick={comebackHome} style={{cursor:'pointer'}}>Cell Shop</span>
                              <Category/>
                        </div>
                        <Search/>
                        <div className="cl-header__right">
                              <div className="cl-header__user">
                                    {
                                          customerName ?
                                                <div className="cl-header__user--info">
                                                      <img src={customerPhoto} alt="" />
                                                      <span>{customerName}</span>
                                                      <button onClick={() => auth.signOut()} className="cl-header__user--logout-in">Đăng xuất</button>
                                                </div>
                                                :
                                                <button onClick={gotoLoginPage} className="cl-header__user--logout-in">Đăng nhập</button>
                                    }
                              </div>
                              <div onClick={gotoCartPage} className="cl-header__cart">
                                    <i className="fas fa-shopping-cart">
                                          <span>{carts.cartTotalQuantity}</span>
                                    </i>
                              </div>
                        </div>
                  </Container>
                  <PopUpLogin
                        popUpLoginDialog={popUpLoginDialog}
                        setPopUpLoginDialog={setPopUpLoginDialog}
                  />
                  <ToastContainer/>
            </div>
      );
}

export default Header;