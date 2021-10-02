import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import useFirestore from '../../../customHooks/useFirestore'
import { db } from '../../../firebase/config';
import ProductItem from '../productItem/ProductItem';
import './ProductByCategory.css';
import {Container} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import Footer from '../footer/Footer';

ProductByCategory.propTypes = {
      products: PropTypes.array,
};
ProductByCategory.defaultProps ={
      products:[]
}

function ProductByCategory(props) {
      const {id} = useParams();
      const [categoryName, setCategoryName] = useState('');
      //get category name by id
      useEffect(()=>{
            async function handleSetProductDetails(){
                  return db.collection("category").doc(id).get().then(doc =>{
                       const  fetchCategory = doc.data();
                       setCategoryName(fetchCategory.name);
                  })
            }
            handleSetProductDetails();
      },[id])
      //
      useEffect(()=>{
            document.title= `${categoryName}`
      },[categoryName])
      //get all product by category id
      const condition = useMemo(()=>({
            fieldName:'categoryId',
            operator:'==',
            compareValue:id
      }),[id]);
      const products = useFirestore('product', condition);
      //sort price
      const [productSort, setProductSort]= useState([]);
      const [sort, setSort] = useState({
            _sortPrice: products
      });
      useEffect(()=>{
            async function handleSort(){
                  setProductSort(products);
            }
            handleSort();
      },[sort, products])
      const asc = () => {
            const sortAsc = products.sort((a, b) => a.discount - b.discount);
            setSort({
                  ...sort,
                  _sortPrice: sortAsc
            })
      }
      const desc=()=>{
            const sortAsc = products.sort((a, b) => b.discount - a.discount);
            setSort({
                  ...sort,
                  _sortPrice: sortAsc
            })
      }
      return (
            <div className="product-by-filter">
                  <div className="product-detail__header">
                        <Container>
                              <Link to="/Home"><i className="fas fa-home"></i>Trang chủ</Link>
                              <i className="fas fa-chevron-right"></i>
                              <span>{categoryName}</span>
                        </Container>
                  </div>
                  <Container>
                        <div className="cus-prb__filter">
                              <p>Sắp xếp theo</p>
                              <div>
                                    <button onClick={asc}><i className="fas fa-sort-up"></i>Giá thấp tới cao</button>
                                    <button onClick={desc}><i className="fas fa-sort-down"></i>Giá cao tới thấp</button>
                              </div>
                        </div>
                        <div className="cus-pbc__content">
                              <span className="cus-pbc__content--total">
                                    {products.length === 0 ? 'Không có sản phẩm nào':`Có ${products.length} sản phẩm`}
                              </span>
                              <ul>
                                    {
                                          productSort.map(product => (
                                                <ProductItem
                                                      key={product.id}
                                                      product={product}
                                                />
                                          ))
                                    }
                              </ul>
                        </div>
                  </Container>
                  <Footer/>
            </div>
      );
}

export default ProductByCategory;