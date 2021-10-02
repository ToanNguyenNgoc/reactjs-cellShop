import React, { useContext } from 'react';
import { AppContext } from '../../../context/AppProvider';
import {Link} from 'react-router-dom'
import './Home.css'
import Chart from './Chart';


function Home(props) {
      const {userList, customerList, orderList, reviewList, categoryList, productList} = useContext(AppContext);
      const ordersNoCheck = orderList.filter(item => item.isCheckout === false)

      const cards=[
            {
                  icon:'fas fa-user-tie',
                  count: userList.length,
                  text:'Admin',
                  url:'/Admin/user-page',
                  background:' linear-gradient(90deg, rgba(7,41,66,1) 2%, rgba(9,73,121,1) 15%, rgba(0,212,255,1) 90%)'
            },
            {
                  icon:'fas fa-user-tie',
                  count:customerList.length,
                  text:'Khách hàng hàng',
                  url:'/Admin/customer',
                  background:' linear-gradient(90deg, rgba(196,33,157,1) 2%, rgba(200,20,166,1) 18%, rgba(255,0,138,1) 90%)'
            },
            {
                  icon:'fas fa-shopping-cart',
                  count:ordersNoCheck.length,
                  text:'Đơn hàng',
                  url:'/Admin/orders',
                  background:' linear-gradient(90deg, rgba(224,131,37,1) 8%, rgba(240,152,29,1) 35%, rgba(255,178,52,1) 100%)'
            },
            {
                  icon:'far fa-comment-alt',
                  count:reviewList.length,
                  text:'Đánh giá sản phẩm',
                  url:'/Admin/product-review',
                  background:'  linear-gradient(90deg, rgba(100,173,38,1) 8%, rgba(90,187,60,1) 35%, rgba(63,255,52,1) 100%)'
            },
            {
                  icon:'far fa-credit-card',
                  count:categoryList.length,
                  text:'Loại sản phẩm',
                  url:'/Admin/category',
                  background:' linear-gradient(90deg, rgba(177,176,12,1) 8%, rgba(200,199,32,1) 33%, rgba(226,224,48,1) 100%)'
            },
            {
                  icon:'fab fa-product-hunt',
                  count:productList.length,
                  text:'Sản phẩm',
                  url:'/Admin/product',
                  background:' linear-gradient(90deg, rgba(207,20,20,1) 8%, rgba(208,43,43,1) 33%, rgba(255,127,127,1) 100%)'
            }
      ]

      return (
            <div className="cus__category-page">
                  <div className="col-10 cus__category-page__content">
                        <ul className="home-row">
                              {
                                    cards.map((item, index) => (
                                          <li key={index}>
                                                <Link to={item.url}>
                                                      <div style={{background:item.background}} className="home-row__item">
                                                            <div className="home-row__item--left">
                                                                  <h4>{item.count}</h4>
                                                                  <p>{item.text}</p>
                                                            </div>
                                                            <div className="home-row__item--right">
                                                                  <i className={item.icon}></i>
                                                            </div>
                                                      </div>
                                                </Link>
                                          </li>
                                    ))
                              }
                        </ul>
                        <Chart data={orderList} />
                  </div>
            </div>
      );
}

export default Home;