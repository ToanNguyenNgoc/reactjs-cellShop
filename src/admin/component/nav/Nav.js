import React from 'react';
import './style.css'
import { Suspense } from 'react';
import {Route,  Link, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import Category from '../category/Category';
import ProductDetailPage from '../products/ProductDetailPage';
import ProductFormPage from '../products/ProductFormPage';
import Products from '../products/Products';
import SignUp from '../../authentication/signup/SignUp'
import UserPage from '../userPage/UserPage';
import CustomerPage from '../customer/CustomerPage';
import ProductReviews from '../productsReviews/ProductReviews';
import Orders from '../orders/Orders';
import OrderDetails from '../orders/OrderDetails';
import CustomerOrders from '../customer/CustomerOrders';
import Banner from '../banner/Banner';
import BannerFormPage from '../banner/BannerFormPage';
import { ToastContainer } from 'react-toastify';
import Home from '../home/Home';
function Nav(props) {
      const handleCloseNav=()=>{
            document.querySelector('.cus-nav').classList.remove('cus-nav-active')
      }
      return (
            <Suspense fallback={<div>Loading...</div>}>
                  <BrowserRouter>
                        <ul onClick={handleCloseNav} className="col-2 cus-nav"> 
                              <li><Link to="/Admin/home">Home</Link></li>
                              <li><Link to="/Admin/user-page">Admin</Link></li>
                              <li><Link to="/Admin/customer">Khách hàng</Link></li>
                              <li><Link to="/Admin/category">Loại sản phẩm</Link></li>
                              <li><Link to="/Admin/product">Sản phẩm</Link></li>
                              <li><Link to="/Admin/banner-product">Banner</Link></li>
                              <li><Link to="/Admin/product-review">Đánh giá sản phẩm</Link></li>
                              <li><Link to="/Admin/orders">Đơn hàng</Link></li>
                        </ul>
                        <Switch>
                              <Redirect exact from="/Admin" to="/Admin/home"/>
                              <Route exact path="/Admin/home" component={Home} />
                              <Route exact path="/Admin/user-page" component={UserPage} />
                              <Route exact path="/Admin/customer" component={CustomerPage} />
                              <Route exact path="/Admin/customer-orders/:uid" component={CustomerOrders} />
                              <Route exact path="/Admin/sign-up" component={SignUp} />
                              <Route exact path="/Admin/category" component={Category}/>
                              <Route exact path="/Admin/product" component={Products}/>
                              <Route exact path="/Admin/banner-product" component={Banner}/>
                              <Route exact path="/Admin/banner-product/form-page" component={BannerFormPage}/>
                              <Route exact path="/Admin/product-review" component={ProductReviews}/>
                              <Route exact path="/Admin/orders" component={Orders}/>
                              <Route exact path="/Admin/orders/:id" component={OrderDetails}/>
                              <Route exact path="/Admin/product/form-page" component={ProductFormPage}/>
                              <Route exact path="/Admin/product/form-page/:id" component={ProductFormPage}/>
                              <Route exact path="/Admin/product/product-details/:id" component={ProductDetailPage}/>
                        </Switch>
                  </BrowserRouter>
                  <ToastContainer/>
            </Suspense>
      );
}

export default Nav;