import React, { createContext, useEffect, useState } from 'react';
import {db} from '../firebase/config'

export const AppContext = createContext();
export default function AppProvider({children}){
      const [userList, setUseList] = useState([]);
      const[productList, setProductList] = useState([]);
      const [categoryList, setCategoryList] = useState([]);
      const [customerList, setCustomerList] = useState([]);
      const [reviewList, setReviewList] = useState([]);
      const [orderList, setOrderList] = useState([]);
      const [bannerList, setBannerList] = useState([]);
      const [categorySelected, setCategorySelected ] = useState('');

      useEffect(()=>{
            return db.collection('admin').orderBy('createdAt','desc').onSnapshot((snapshot)=>{
                  const fetchUser=[];
                  snapshot.forEach(doc=>{
                        fetchUser.push({
                              id: doc.id,
                              ...doc.data()
                        })
                  })
                  setUseList(fetchUser);
            })
      },[])
      //get customer list
      useEffect(()=>{
            return db.collection('customers').orderBy('createdAt','desc').onSnapshot((snapshot)=>{
                  const fetchCustomer=[];
                  snapshot.forEach(doc=>{
                        fetchCustomer.push({
                              id: doc.id,
                              ...doc.data()
                        })
                  })
                  setCustomerList(fetchCustomer);
            })
      },[])
      //get category list
      useEffect(()=>{
            return db.collection('category').orderBy('name','asc').onSnapshot((snapshot)=>{
                  const fetchCategory=[];
                  snapshot.forEach(doc=>{
                        fetchCategory.push({
                              id: doc.id,
                              ...doc.data()
                        })
                  })
                  setCategoryList(fetchCategory);
            })
      },[])
      //get product list
      useEffect(()=>{
            return db.collection('product').orderBy('createdAt','desc').onSnapshot((snapshot)=>{
                  const fetchProduct=[];
                  snapshot.forEach(doc=>{
                        fetchProduct.push({
                              id: doc.id,
                              ...doc.data()
                        })
                  })
                  setProductList(fetchProduct);
            })
      },[])
      //get review list
      useEffect(()=>{
            return db.collection('reviews').orderBy('createdAt','asc').onSnapshot((snapshot)=>{
                  const fetchReviews = [];
                  snapshot.forEach(doc => {
                        fetchReviews.push({
                              id:doc.id,
                              ...doc.data()
                        })
                  })
                  setReviewList(fetchReviews);
            })
      },[])
      //get order list
      useEffect(()=>{
            return db.collection('orders').orderBy('createdAt','asc').onSnapshot((snapshot)=>{
                  const fetchOrders = [];
                  snapshot.forEach(doc => {
                        fetchOrders.push({
                              id:doc.id,
                              ...doc.data()
                        })
                  })
                  setOrderList(fetchOrders);
            })
      },[])
      //get order list
      useEffect(()=>{
            return db.collection('bannerProduct').orderBy('createdAt','desc').onSnapshot((snapshot)=>{
                  const fetchBanners = [];
                  snapshot.forEach(doc => {
                        fetchBanners.push({
                              id:doc.id,
                              ...doc.data()
                        })
                  })
                  setBannerList(fetchBanners);
            })
      },[])
      return (
            <AppContext.Provider
                  value={{
                        userList,
                        customerList,
                        categoryList, setCategoryList,
                        productList, setProductList,
                        reviewList,
                        orderList,
                        bannerList,
                        categorySelected, setCategorySelected,
                  }}
            >
                  {children}
            </AppContext.Provider>
      )
}