import React, { useContext } from 'react';
import { AppContext } from '../../../context/AppProvider';
import formatDate from '../../../commons/formatDate';
import {Avatar,IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useHistory } from 'react-router';
import './Customer.css'
function CustomerPage(props) {
      const { customerList } = useContext(AppContext);
      const history = useHistory();
      return (
            <div className="cus-user-page">
                  <div className="col-10 cus-user-page__content">
                        <div className="table-wrapper">
                              <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                          <TableHead>
                                                <TableRow>
                                                      <TableCell>#</TableCell>
                                                      <TableCell align="left">Email</TableCell>
                                                      <TableCell align="left">Avatar</TableCell>
                                                      <TableCell align="left">Name</TableCell>
                                                      <TableCell align="left">Create at</TableCell>
                                                      <TableCell align="left">View orders</TableCell>
                                                </TableRow>
                                          </TableHead>
                                          <TableBody>
                                                {customerList.map((item, index) => (
                                                      <TableRow
                                                            key={index}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                      >
                                                            <TableCell align="left">{index}</TableCell>
                                                            <TableCell align="left">{item.email}</TableCell>
                                                            <TableCell align="left">
                                                                  <Avatar alt={item.name} src={item.photoURL} />
                                                            </TableCell>
                                                            <TableCell align="left">{item.displayName}</TableCell>
                                                            <TableCell align="left">
                                                                  {formatDate(item.createdAt?.seconds)}
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                  <IconButton 
                                                                        onClick={()=>history.push(`/Admin/customer-orders/${item.uid}`)}
                                                                        color="success"
                                                                  >
                                                                        <VisibilityIcon/>
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

export default CustomerPage;