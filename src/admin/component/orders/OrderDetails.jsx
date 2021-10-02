import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { db } from '../../../firebase/config';
import {formatPrice} from '../../../commons/formatPrice';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import {toast } from 'react-toastify';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material'
import 'react-toastify/dist/ReactToastify.css';

function OrderDetails(props) {
      const [detail, setDetail] = useState({});
      const history = useHistory();
      const {id} = useParams();
      const [isCheck, setIsCheck] = useState(false);
      const [isCheckDelivery, setIsCheckDelivery] = useState(false);
      useEffect(()=>{
            async function handleSetOrderDetails(){
                  return db.collection("orders").doc(id).get().then(doc =>{
                       const order = doc.data();
                       setDetail(order);
                  })
            }
            handleSetOrderDetails();
      },[id])
      useEffect(()=>{
            async function handleSetCheck(){
                  if(detail.isCheckout=== true){
                        setIsCheck(true)
                  }else{
                        setIsCheck(false)
                  }
                  if(detail.isDelivery === true){
                        setIsCheckDelivery(true)
                  }else{
                        setIsCheckDelivery(false);
                  }
            }
            handleSetCheck();
      },[detail.isCheckout, detail.isDelivery]);
      const handleOnSubmit=(e)=>{
            e.preventDefault();
            if(id){
                  db.collection("orders").doc(id).update({
                        isCheckout: isCheck,
                        isDelivery: isCheckDelivery
                  })
                  toast.success('Order is checked out !')
                  history.push('/Admin/orders');
            }
            history.push('/Admin/orders');
      }
      return (
            <div className="cus__category-page">
                  <div className="col-10 cus__category-page__content">
                        <form autoComplete="off" onSubmit={handleOnSubmit}>
                              Order check out status:
                              <Checkbox
                                    color="primary"
                                    name="active"
                                    checked={isCheck}
                                    onChange={(e) => { setIsCheck(e.target.checked) }}
                              />
                              Delivery status:
                              <Checkbox
                                    color="primary"
                                    name="active"
                                    checked={isCheckDelivery}
                                    onChange={(e) => { setIsCheckDelivery(e.target.checked) }}
                              />
                              <Button type="submit" variant="contained" color="primary">
                                    Check out and back
                              </Button>
                        </form>
                        <TableContainer component={Paper}>
                              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                          <TableRow>
                                                <TableCell>Customer name</TableCell>
                                                <TableCell align="left">Total</TableCell>
                                                <TableCell align="left">Phone</TableCell>
                                                <TableCell align="left">Address</TableCell>
                                                <TableCell align="left">Note</TableCell>
                                          </TableRow>
                                    </TableHead>
                                    <TableBody>
                                          <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                          >
                                                <TableCell component="th" scope="row">
                                                      {detail.customerName}
                                                </TableCell>
                                                <TableCell align="left" style={{ color: 'var(--client-primary-color)', fontWeight: '700' }}>
                                                      {formatPrice.format(detail.totalAmount)}
                                                </TableCell>
                                                <TableCell align="left">{detail.phone}</TableCell>
                                                <TableCell align="left">{detail.address}</TableCell>
                                                <TableCell align="left">{detail.note}</TableCell>
                                          </TableRow>
                                    </TableBody>
                              </Table>
                        </TableContainer>
                        <h5>Order product detail</h5>
                        <div className="table-wrapper">
                              <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                          <TableHead>
                                                <TableRow>
                                                      <TableCell>Name</TableCell>
                                                      <TableCell align="left">Image</TableCell>
                                                      <TableCell align="left">Sale price</TableCell>
                                                      <TableCell align="left">Quantity</TableCell>
                                                      <TableCell align="left">Price amount</TableCell>
                                                </TableRow>
                                          </TableHead>
                                          <TableBody>
                                                {detail.orderDetail?.map((item, index) => (
                                                      <TableRow
                                                            key={index}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                      >
                                                            <TableCell align="left">
                                                                  {item.productName}
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                  <img style={{ width: '100px', height: '100px' }} src={item.productImage} alt="" />
                                                            </TableCell>
                                                            <TableCell align="left">{formatPrice.format(item.salePrice)}</TableCell>
                                                            <TableCell align="left">{item.cartQuantity}</TableCell>
                                                            <TableCell align="left">
                                                                  {formatPrice.format(item.salePrice * item.cartQuantity)}
                                                            </TableCell>
                                                      </TableRow>
                                                ))}
                                          </TableBody>
                                    </Table>
                              </TableContainer>
                        </div>
                  </div>
            </div>
      );
}

export default OrderDetails;