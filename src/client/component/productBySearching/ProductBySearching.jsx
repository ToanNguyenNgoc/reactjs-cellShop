import React,{useContext, useState, useEffect} from 'react';
import { useParams } from 'react-router';
import {Link} from 'react-router-dom'
import { AppContext } from '../../../context/AppProvider';
import ProductItem from '../productItem/ProductItem';
import {Container} from 'react-bootstrap';
import useSearchTerm from '../../../customHooks/useSearchTerm';
import Footer from '../footer/Footer';



function ProductBySearching(props) {
      const {search} = useParams();
      const {productList} = useContext(AppContext);
      //
      useEffect(()=>{
            document.title = `Kết quả tìm kiếm cho: ${search}`
      },[search])
      //
      const productBySearch = useSearchTerm(search, productList)
      const [productSort, setProductSort] = useState([]);
      const [sort, setSort] = useState({
            _sortPrice: productBySearch
      })
      useEffect(()=>{
            async function handleSort(){
                  setProductSort(productBySearch);
            }
            handleSort();
      },[sort, productBySearch])
      const asc = () => {
            const sortAsc = productBySearch.sort((a, b) => a.discount - b.discount);
            setSort({
                  ...sort,
                  _sortPrice: sortAsc
            })
      }
      const desc=()=>{
            const sortAsc = productBySearch.sort((a, b) => b.discount - a.discount);
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
                                    {productBySearch.length === 0 ? 'Không có sản phẩm nào':`Có ${productBySearch.length} sản phẩm`}
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

export default ProductBySearching;