import React, {useContext, useMemo, useState} from 'react';
import './ProductDetailReview.css';
import {addDocument} from '../../../firebase/services'
import {AuthContextClient} from '../../../context/AuthContextClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFirestore from '../../../customHooks/useFirestore';
import formatDate from '../../../commons/formatDate'


function ProductDetailReview(props) {
      const {productId, productName} = props
      const {user:{uid, displayName}} = useContext(AuthContextClient);
      const [value, setValue] = useState('');
      const handleSubmit=(e)=>{
            e.preventDefault();
            if(uid){
                  addDocument('reviews', {
                        uid: uid,
                        userName:displayName,
                        productId: productId,
                        content: value
                  })
                  setValue('')
                  toast.success('Cảm ơn bạn đã đáng giá !')
            }else{
                  toast.warn('Vui lòng đăng nhập trước khi đáng giá !');
            }
      }
      const onChange =(e)=>{
            e.preventDefault();
            setValue(e.target.value);
      }
      //get review text by product id
      const condition  = useMemo(()=>({
            fieldName:'productId',
            operator:'==',
            compareValue:productId
            
      }),[productId])
      const reviewByProductId = useFirestore('reviews', condition);
      return (
            <div className="product-review">
                  <span className="product-review__header">
                        {
                              reviewByProductId.length===0 ? 'Chưa có đánh giá':`${reviewByProductId.length} đáng giá cho ${productName}`
                        }     
                  </span>
                  <ul>
                        {
                              reviewByProductId.map(item => (
                                    <li key={item.id}>
                                          <div className="product-review__item">
                                                <div className="product-review__item--header">
                                                      <span className="product-review__item--header__user">{item.userName}</span>
                                                      <span className="product-review__item--header__date">
                                                            {formatDate(item.createdAt?.seconds)}
                                                      </span>
                                                </div>
                                                <div className="product-review__item--text">
                                                      {item.content}
                                                </div>
                                          </div>
                                    </li>
                              ))
                        }
                  </ul>
                  <div className="product-review__form">
                        <span>Đánh giá sản phẩm</span>
                        <form autoComplete="off" onSubmit={handleSubmit}>
                              <textarea value={value} onChange={onChange} placeholder="Xin mời để lại đáng giá về sản phẩm" required></textarea>
                              <div className="product-review__form--send">
                                    <button type='submit'>Gửi</button>
                              </div>
                        </form>
                  </div>
                  <ToastContainer/>
            </div>
      );
}

export default ProductDetailReview;