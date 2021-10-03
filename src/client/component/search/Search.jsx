import React, {useState, useContext} from 'react';
import {AppContext} from '../../../context/AppProvider'
import {useHistory} from 'react-router-dom';
import useSearchTerm from '../../../customHooks/useSearchTerm';
import {formatPrice} from '../../../commons/formatPrice';
import './Search.css'

function Search(props) {
      const history = useHistory();
      const {productList} = useContext(AppContext)
      console.log(productList)
      const [search, setSearch] = useState('');
      const handleChange=(e)=>{
            e.preventDefault();
            setSearch(e.target.value);
      }
      const handleGotoResultPage=()=>{
            const url =`/Home/Searching/${search}`;
            history.push(url);
            document.querySelector('.search-bar__result').classList.remove('result_active')
      }
      const productsBySearch = useSearchTerm(search, productList);
      const products = productsBySearch.slice(0,5);
      //control UI
      const openCategory=()=>{
            document.querySelector('.cl-header__category').classList.toggle('cl-header__category--active');
      }
      const handleFocus=()=>{
            document.querySelector('.search-bar__result').classList.add('result_active')
      }
      const handleDetail=(id)=>{
            history.push(`/Home/Product-detail/${id}`)
            document.querySelector('.search-bar__result').classList.remove('result_active')
      }     
      return (
            <div className="cl-header__search-bar">
                  <button onClick={openCategory} className="open-category" ><i className="fas fa-bars"></i></button>
                  <input className="search-bar__text"
                        value={search}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        type="text"
                        placeholder="Bạn cần tìm gì ?"
                  />
                  <div className="search-bar__result">
                        <ul>
                              {
                                    search.length === 0 ? ''
                                          :
                                          products?.map(item => (
                                                <li
                                                      onClick={() => handleDetail(item.id)}
                                                      key={item.id}
                                                >
                                                      <img src={item.productImage} alt="" />
                                                      <div className="result-item">
                                                            <p>{item.productName}</p>
                                                            <h4>{formatPrice.format(item.discount)}</h4>
                                                      </div>
                                                </li>
                                          ))
                              }
                        </ul>
                  </div>
                  <button onClick={handleGotoResultPage} ><i className="fas fa-search"></i></button>
            </div>
      );
}

export default Search;