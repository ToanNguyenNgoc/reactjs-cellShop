import React, { useContext, useMemo, useState } from 'react';
import { AppContext } from '../../../context/AppProvider';
import useFirestore from '../../../customHooks/useFirestore';
import ProductReviewsList from './ProductReviewsList';
import './ProductReview.css'

ProductReviews.propTypes = {
      
};

function ProductReviews(props) {
      const {categoryList} = useContext(AppContext);
      const [categoryId, setCategoryId] = useState('');
      const [productId, setProductId] = useState('');

      const handleCategorySelectChange=(e)=>{
            setCategoryId(e.target.value)
      }
      const handleProductSelectChange=(e)=>{
            setProductId(e.target.value)
      }
      //get product by category id
      const condition = useMemo(()=>({
            fieldName:'categoryId',
            operator:'==',
            compareValue:categoryId
      }),[categoryId]);
      const products = useFirestore('product', condition);
      //get reviews list by product Id
      const conditionReview = useMemo(()=>({
            fieldName:'productId',
            operator:'==',
            compareValue:productId
      }),[productId]);
      const reviews = useFirestore('reviews', conditionReview);
      return (
            <div className="cus__category-page">
                  <div className="cus__category-page__content cus__form-product col-10">
                        <div className="field-group">
                              <label>Loại sản phẩm</label>
                              <select style={{ marginRight: '30px' }} className="col-4" value={categoryId} onChange={handleCategorySelectChange}>
                                    {categoryList.map((category) => (
                                          <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                              </select>
                        </div>
                        <div className="field-group">
                              <label>Tên sản phẩm</label>
                              <select className="col-4" value={productId} onChange={handleProductSelectChange}>
                                    {products.map((product) => (
                                          <option key={product.id} value={product.id}>{product.productName}</option>
                                    ))}
                              </select>
                        </div>
                        <ProductReviewsList
                              reviews={reviews}
                        />
                  </div>
            </div>
      );
}

export default ProductReviews;