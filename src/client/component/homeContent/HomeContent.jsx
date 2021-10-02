import React,{useContext, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import Category from '../category/Category';
import ProductItem from '../productItem/ProductItem';
import HomeContentHotSale from './HomeContentHotSale';
import Footer from '../footer/Footer'
import {AppContext} from '../../../context/AppProvider';
import './HomeContent.css';
import {useHistory} from 'react-router-dom';
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@material-ui/core'
import HomeContentTopSold from './HomeContentTopSold';
import HomeContentProductByLaptop from './HomeContentProductByLaptop'

function HomeContent(props) {
      const title='Cell Shop'
      const {bannerList, productList} = useContext(AppContext);
      const newProducts = productList.slice(0, 2);
      const history  = useHistory();
      const gotoProductDetailPage=(id)=>{
            history.push(`/Home/Product-detail/${id}`)
      }
      useEffect(()=>{
            document.title=`${title}`
      },[title])
      return (
            <div className="home-content">
                  <Container>
                        <div className="content-top">
                              <div className="content-top__menu">
                                    <Category />
                              </div>
                              <div className="content-top__banner">
                                    <Carousel>
                                          {
                                                bannerList.map(item => (
                                                      <Paper className="content-top__banner--item" key={item.id}>   
                                                            <img onClick={()=> gotoProductDetailPage(item.productId)} className="content-top__banner--img" src={item.bannerImageUrl} alt="" />
                                                      </Paper>
                                                ))
                                          }
                                    </Carousel>
                              </div>
                              <div className="content-top__top-product">
                                    {
                                          newProducts.map(item =>(
                                                <ProductItem
                                                      key={item.id}
                                                      product={item}
                                                />
                                          ))
                                    }
                              </div>
                        </div>
                        <HomeContentHotSale
                              products={productList}
                        />
                        <HomeContentTopSold
                              products={productList}
                        />
                        <HomeContentProductByLaptop
                              products={productList}
                        />
                  </Container>
                  <Footer/>
            </div>
      );
}

export default HomeContent;