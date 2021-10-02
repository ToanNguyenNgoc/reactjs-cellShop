import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../../commons/formatDate';
import firebase from 'firebase/app';
import { ToastContainer, toast } from 'react-toastify';
import {IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import 'react-toastify/dist/ReactToastify.css';
import './ProductReview.css'

ProductReviewsList.propTypes = {
      reviews:PropTypes.array
};
ProductReviewsList.defaultProps={
      reviews:[]
}

function ProductReviewsList(props) {
      const {reviews} = props;
      const handleDeleteReview=(id)=>{
            try{
                  firebase
                        .firestore()
                        .collection('reviews')
                        .doc(id)
                        .delete()
                  toast.success('Deleted review !');
            }catch(error){
                  console.log(error);
            }
      }
      return (
            <div className="table-responsive mt-10">
                  <div className="table-wrapper">
                        <TableContainer component={Paper}>
                              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                          <TableRow>
                                                <TableCell>#</TableCell>
                                                <TableCell align="left">Customer name</TableCell>
                                                <TableCell align="left">Text</TableCell>
                                                <TableCell align="left">Date</TableCell>
                                                <TableCell align="left">Delete</TableCell>
                                          </TableRow>
                                    </TableHead>
                                    <TableBody>
                                          {reviews.map((item, index) => (
                                                <TableRow
                                                      key={index}
                                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                      <TableCell align="left">{index}</TableCell>
                                                      <TableCell align="left">{item.userName}</TableCell>
                                                      <TableCell align="left">{item.content}</TableCell>
                                                      <TableCell align="left">
                                                      {formatDate(item.createdAt?.seconds)}
                                                      </TableCell>
                                                      <TableCell align="left">
                                                            <IconButton
                                                                  color="error"
                                                                  onClick={()=> handleDeleteReview(item.id)}
                                                            >
                                                                  <DeleteIcon/>
                                                            </IconButton>
                                                      </TableCell>
                                                </TableRow>
                                          ))}
                                    </TableBody>
                              </Table>
                        </TableContainer>
                  </div>
                  <ToastContainer/>
            </div>
      );
}

export default ProductReviewsList;