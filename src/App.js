
import './App.css';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import React, { Suspense } from 'react';
import Dashboard from './admin/component/dashboard/Dashboard';
import AppProvider from './context/AppProvider';
import SignIn from './admin/authentication/signin/SignIn';
import AuthProvider from './context/AuthContext';
import PrivateRoute from './commons/privateRoute'
import AuthProviderClient from './context/AuthContextClient';
import ProductByCategory from './client/component/productByCategory/ProductByCategory';
import ProductBySearching from './client/component/productBySearching/ProductBySearching';
import ProductDetails from './client/component/productDetail/ProductDetails';
import HomeContent from './client/component/homeContent/HomeContent';
import Cart from './client/component/cart/Cart';
import CartOrderSuccess from './client/component/cart/CartOrderSuccess';
import MyOrders from './client/component/myOrders/MyOrders';
import ClientPrivateRoute from './commons/clientPrivateRoute';
import {ToastContainer } from 'react-toastify';
import SignUp from './admin/authentication/signup/SignUp'

const Home = React.lazy(()=> import('./client/component/home/Home'))
function App() {
  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <BrowserRouter>
        <AuthProvider>
          <AppProvider>
            <Switch>
              <Redirect exact from="/" to="/Home/Cell-shop" />
              <Redirect exact from="/Home" to="/Home/Cell-shop" />

              <PrivateRoute path="/Admin" component={Dashboard} />
              <Route exact path="/sign-in" component={SignIn} />
              <PrivateRoute exact path="/sign-up" component={SignUp} />
              <AuthProviderClient>
                <Route path="/Home" component={Home} />
                <Route path="/Home/Cell-shop" component={HomeContent} />
                <Route path="/Home/Category/:id" component={ProductByCategory} />
                <Route path="/Home/Searching/:search" component={ProductBySearching} />
                <Route path="/Home/Product-detail/:id" component={ProductDetails} />
                <Route path="/Home/Cart" component={Cart} />
                <ClientPrivateRoute path="/Home/My-orders/:uid" component={MyOrders} />
                <Route path="/Home/Order-success" component={CartOrderSuccess} />
                <ToastContainer />
              </AuthProviderClient>
            </Switch>
          </AppProvider>
        </AuthProvider>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
