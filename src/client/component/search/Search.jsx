import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import './Search.css'

function Search(props) {
      const history = useHistory();
      const [search, setSearch] = useState('');
      const handleChange=(e)=>{
            e.preventDefault();
            setSearch(e.target.value);
      }
      const handleGotoResultPage=()=>{
            const url =`/Home/Searching/${search}`;
            history.push(url);
      }
      //control UI
      const openCategory=()=>{
            document.querySelector('.cl-header__category').classList.toggle('cl-header__category--active');
      }
      return (
            <div className="cl-header__search-bar">
                  <button onClick={openCategory} className="open-category" ><i className="fas fa-bars"></i></button>
                  <input
                        value={search}
                        onChange={handleChange}
                        type="text"
                        placeholder="Bạn cần tìm gì ?"
                  />
                  <button onClick={handleGotoResultPage} ><i className="fas fa-search"></i></button>
            </div>
      );
}

export default Search;