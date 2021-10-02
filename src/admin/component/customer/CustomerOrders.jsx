import React, { useMemo } from 'react';
import { useHistory, useParams } from 'react-router';
import useFirestore from '../../../customHooks/useFirestore';
import {formatPrice} from '../../../commons/formatPrice';
import formatDate from '../../../commons/formatDate';
import {IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

function CustomerOrders(props) {
      const {uid} = useParams();
      const history = useHistory();
      //get all order by uid
      const condition = useMemo(()=>({
            fieldName:'uid',
            operator:'==',
            compareValue:uid
      }),[uid])
      const ordersList = useFirestore('orders', condition);
      return (
            <div className="cus-user-page">
                  <div className="col-10 cus-user-page__content">
                        Orders of customer: {ordersList.length}
                        <div className="table-wrapper">
                              <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                          <TableHead>
                                                <TableRow>
                                                      <TableCell>Order id</TableCell>
                                                      <TableCell align="left">Customer name</TableCell>
                                                      <TableCell align="left">Total</TableCell>
                                                      <TableCell align="left">Order date</TableCell>
                                                      <TableCell align="left">Order status</TableCell>
                                                      <TableCell align="left">View detail</TableCell>
                                                </TableRow>
                                          </TableHead>
                                          <TableBody>
                                                {ordersList.map((item, index) => (
                                                      <TableRow
                                                            key={index}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                      >
                                                            <TableCell align="left">{item.id}</TableCell>
                                                            <TableCell align="left">{item.customerName}</TableCell>
                                                            <TableCell align="left">
                                                                  {formatPrice.format(item.totalAmount)}
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                  {formatDate(item.createdAt?.seconds)}
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                  {item.isCheckout === true ? 'Checked out' : 'Pending...'}
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                  <IconButton
                                                                        onClick={() => history.push(`/Admin/orders/${item.id}`)}
                                                                        color="success"
                                                                  >
                                                                        <VisibilityIcon />
                                                                  </IconButton>
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

export default CustomerOrders;