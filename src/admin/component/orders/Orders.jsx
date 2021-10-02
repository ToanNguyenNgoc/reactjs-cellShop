import React, { useContext } from 'react';
import { AppContext } from '../../../context/AppProvider';
import { useHistory } from 'react-router';
import firebase from "firebase/app"
import 'firebase/firestore';
import {formatPrice} from '../../../commons/formatPrice';
import formatDate from '../../../commons/formatDate';
import {IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import DeleteIcon from '@mui/icons-material/Delete';
import './Orders.css'

function Orders(props) {
      const {orderList} = useContext(AppContext);
      const history = useHistory();
      const handleDeleteOrder =(id)=>{
            firebase
                  .firestore()
                  .collection("orders")
                  .doc(id)
                  .delete()
      }
      return (
            <div className="cus__category-page">
                  <div className="col-10 cus__category-page__content">
                        <TableContainer component={Paper}>
                              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                          <TableRow>
                                                <TableCell>Order Id</TableCell>
                                                <TableCell align="left">Customer name</TableCell>
                                                <TableCell align="left">Total</TableCell>
                                                <TableCell align="left">Order date</TableCell>
                                                <TableCell align="left">Delivery status</TableCell>
                                                <TableCell align="left">Order status</TableCell>
                                                <TableCell align="left">Order detail</TableCell>
                                          </TableRow>
                                    </TableHead>
                                    <TableBody>
                                          {orderList?.map((item) => (
                                                <TableRow
                                                      key={item.id}
                                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                      <TableCell align="left">{item.id}</TableCell>
                                                      <TableCell align="left">{item.customerName}</TableCell>
                                                      <TableCell>
                                                            {formatPrice.format(item.totalAmount)}
                                                      </TableCell>
                                                      <TableCell>
                                                            {formatDate(item.createdAt?.seconds)}
                                                      </TableCell>
                                                      <TableCell align="left">
                                                            {item.isDelivery === true ? 'Delivered' : 'not delivery...'}
                                                      </TableCell>
                                                      <TableCell align="left">
                                                            {item.isCheckout === true ? 'Checked out' : 'Pending...'}
                                                      </TableCell>
                                                      <TableCell align="left">
                                                            <IconButton
                                                                  onClick={() => history.push(`/Admin/orders/${item.id}`)}
                                                                  color="primary"
                                                            >
                                                                  <ViewListIcon />
                                                            </IconButton>
                                                            <IconButton onClick={() => handleDeleteOrder(item.id)} color="error">
                                                                  <DeleteIcon />
                                                            </IconButton>
                                                      </TableCell>
                                                </TableRow>
                                          ))}
                                    </TableBody>
                              </Table>
                        </TableContainer>
                  </div>
            </div>
      );
}

export default Orders;