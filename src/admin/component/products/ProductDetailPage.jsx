import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { db } from '../../../firebase/config';
import ReactHtmlParser from 'react-html-parser'
import {Container} from 'react-bootstrap'
function ProductDetailPage(props) {
      const [productDetail, setProductDetail] = useState({});
      const {id} = useParams();
      useEffect(()=>{
            async function handleSetProductDetails(){
                  return db.collection("product").doc(id).get().then(doc =>{
                       const  product = doc.data();
                       setProductDetail(product);
                  })
            }
            handleSetProductDetails();
      },[id])
      return (
            <Container>
                  <span>{productDetail.productName}</span>
                  <img style={{width:'150px'}} src={productDetail.productImage} alt="" />
                  <span>{ReactHtmlParser(productDetail.productDescription)}</span>
            </Container>
      );
}

export default ProductDetailPage;