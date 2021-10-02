import React, {useEffect, useState, useMemo} from 'react';
import {useParams, Link} from 'react-router-dom'
import {Container} from 'react-bootstrap';
import {formatPrice} from '../../../commons/formatPrice'
import useFirestore from '../../../customHooks/useFirestore';
import {db} from '../../../firebase/config'
import {useHistory} from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import './ProductDetail.css'
import ProductItem from '../productItem/ProductItem';
import ProductDetailReview from '../productDetailReview/ProductDetailReview';
import ProductDetailAddCart from '../productDetailAddCart/ProductDetailAddCart'
import Footer from '../footer/Footer';

function ProductDetails(props) {
      const {id} = useParams();
      const history = useHistory();
      const [detail, setDetail] = useState({});
      useEffect(() => {
            async function handleSetProductDetails() {
                  return db.collection("product").doc(id).get().then(doc => {
                        const product = doc.data();
                        setDetail(product);
                  })
            }
            handleSetProductDetails();
      }, [id])
      //
      useEffect(() => {
            document.title = `${detail.productName}`
      },[detail.productName])

      const condition = useMemo(()=>({
            fieldName:'categoryId',
            operator:'==',
            compareValue:detail.categoryId
      }),[detail.categoryId]);
      const productsFetch = useFirestore('product', condition);
      const productFilter = productsFetch.filter(item => item.id !== id)
      const products = productFilter.slice(0,5);
      const openMore=()=>{
            document.querySelector('.product-description').classList.toggle('product-description__show-all');
            const buttonViewMore = document.querySelector('.cus-view-more__btn');
            buttonViewMore.innerText=''
      }
      return (
            <div className="product-detail__page">
                  <div className="product-detail__header">
                        <Container>
                              <Link to="/Home"><i className="fas fa-home"></i>Trang chủ</Link>
                              <i className="fas fa-chevron-right"></i>
                              <span className="product-detail__header--name">{detail.productName}</span>
                        </Container>
                  </div>
                  <Container className="cus-container">
                        <div className="product-detail__topview">
                              <h1>{detail.productName}</h1>
                        </div>
                        <div className="product-detail">
                              <div className="product-detail__left">
                                    <img src={detail.productImage} alt="" />
                              </div>
                              <div className="product-detail__right">
                                    {
                                          detail.sale === true ?
                                                <div>
                                                      <div className="product-detail__right--header">
                                                            <div className="product-detail__right--header__price">
                                                                  <div className="detail__price">
                                                                        <div className="detail__price--detail">
                                                                              <span className="sale-price">{formatPrice.format(detail.discount)}</span>
                                                                              <span className="old-price">
                                                                                    <span className="old-price__title">Giá niêm yết:</span>
                                                                                    <span className="old-price__mon">{formatPrice.format(detail.price)}</span>
                                                                              </span>
                                                                        </div>
                                                                        {
                                                                              detail.quantity === 0 ?
                                                                                    <div>
                                                                                          <h3>Hết hàng</h3>
                                                                                          <h3>Đã bán : <strong>{detail.totalSold}</strong></h3>
                                                                                    </div>
                                                                                    :
                                                                                    <div className="status-quantity">
                                                                                          <h3>Kho hàng : <strong>{detail.quantity}</strong></h3>
                                                                                          <h3>Đã bán : <strong>{detail.totalSold}</strong></h3>
                                                                                    </div>
                                                                        }
                                                                  </div>
                                                                  <strong>Sản phẩm thuộc chương trình Hot Sale - Nhanh tay thanh toán !</strong>
                                                            </div>
                                                      </div>
                                                      <div className="product-detail__right--header__hot-sale">
                                                            HOT SALE
                                                      </div>
                                                      <div className="cps-additional-note">
                                                            <p>Hotsales giảm {detail.percent}%: Sốc chỉ còn {formatPrice.format(detail.discount)} (số lượng có hạn, không áp dụng cùng chương trình khác).</p>
                                                            <p>Ngày hotsales cuối cùng chỉ áp dụng mua tại cửa hàng hoặc thanh toán online 100%</p>
                                                      </div>
                                                </div>
                                                :
                                                <div>
                                                      <div className="product-detail__right--header">
                                                            <div className="detail__price">
                                                                  <div className="detail__price--detail">
                                                                        <span className="sale-price">Giá niêm yết: {formatPrice.format(detail.discount)}</span>
                                                                  </div>
                                                                  {
                                                                        detail.quantity === 0 ?
                                                                              <div>
                                                                                    <h3>Hết hàng</h3>
                                                                                    <h3>Đã bán : <strong>{detail.totalSold}</strong></h3>
                                                                              </div>
                                                                              :
                                                                              <div className="status-quantity">
                                                                                    <h3>Kho hàng : <strong>{detail.quantity}</strong></h3>
                                                                                    <h3>Đã bán : <strong>{detail.totalSold}</strong></h3>
                                                                              </div>
                                                                  }
                                                            </div>
                                                      </div>
                                                </div>
                                    }
                                    {
                                          detail.quantity === 0 ?
                                                <div className="out-of-stock">
                                                      Sản phẩm đã hết hàng
                                                </div>
                                                :
                                                <ProductDetailAddCart
                                                      product={detail}
                                                      id={id}
                                                />
                                    }
                              </div>
                        </div>
                        <div className="product-description">
                              <span className="product-description__title">Mô tả sản phẩm</span>
                              {ReactHtmlParser(detail.productDescription)}
                        </div>
                        <button onClick={openMore} className="cus-view-more__btn">Xem thêm</button>
                        <span className="product-similar__header">
                              Các sản phẩm tương tự
                              <h5 onClick={()=> history.push(`/Home/Category/${detail.categoryId}`)} >Xem thêm</h5>
                        </span>
                        <div className="product-similar">
                              <div className="product-similar__wrapper">
                                    <ul>
                                          {
                                               products.map(product=> (
                                                      <ProductItem
                                                            key={product.id}
                                                            product={product}
                                                      />
                                               )) 
                                          }
                                    </ul>
                              </div>
                        </div>
                        <ProductDetailReview
                              productId={id}
                              productName={detail.productName}
                        />
                  </Container>
                  <Footer/>
            </div>
      );
}

export default ProductDetails;