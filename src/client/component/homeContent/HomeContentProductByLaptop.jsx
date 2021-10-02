import React, {  useMemo } from 'react';
import './HomeContent.css'
import ProductItem from '../productItem/ProductItem';
import useFirestore from '../../../customHooks/useFirestore';
import {useHistory} from 'react-router-dom'



function HomeContentProductByLaptop(props) {
      const history = useHistory();
      const lapTopId = 'whG1zCsY8GIBXBsAqZOB'
      const handleViewMore=()=>{
            history.push(`/Home/Category/${lapTopId}`)
      }
       //get all product by category id
       const condition = useMemo(()=>({
            fieldName:'categoryId',
            operator:'==',
            compareValue:lapTopId
      }),[lapTopId]);
      const productsLaptop = useFirestore('product', condition);
      const productsLaptop5 = productsLaptop.slice(0,6);
      return (
            <div className="content-sale">
                  <div className="content-sale__header">
                        <strong>LAPTOP</strong>
                        <button onClick={handleViewMore}>Xem tất cả</button>
                  </div>
                  <div className="content-sale__product">
                        <div className="product-similar__wrapper">
                              <ul>
                                    {
                                          productsLaptop5.map(product => (
                                                <ProductItem
                                                      key={product.id}
                                                      product={product}
                                                />
                                          ))
                                    }
                              </ul>
                        </div>
                  </div>
            </div>
      );
}

export default HomeContentProductByLaptop;