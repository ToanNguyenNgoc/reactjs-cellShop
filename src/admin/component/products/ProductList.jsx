import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../../../commons/formatPrice';
import {IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

ProductList.propTypes = {
      products: PropTypes.array,
      onDetail: PropTypes.func,
      onDelete:PropTypes.func,
      onUpdate: PropTypes.func
};
ProductList.defaultProps={
      products:[],
      onDetail:null,
      onDelete: null,
      onUpdate: null
}
function ProductList(props) {
      const { products, onDelete, onUpdate } = props;
      const handleOnDeleteClick=(product)=>{
            if(onDelete){
                  onDelete(product)
            }
      }
      const handleOnUpdateClick=(id)=>{
            if(onUpdate){
                  onUpdate(id)
            }
      }
      return (
            <div className="table-wrapper">
                  <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                              <TableHead>
                                    <TableRow>
                                          <TableCell>#</TableCell>
                                          <TableCell align="left">Name</TableCell>
                                          <TableCell align="left">Image</TableCell>
                                          <TableCell align="left">Price</TableCell>
                                          <TableCell align="left">Sale price</TableCell>
                                          <TableCell align="left">Status</TableCell>
                                          <TableCell align="left">Quantity</TableCell>
                                          <TableCell align="left">Sale status</TableCell>
                                          <TableCell align="left">Options</TableCell>
                                    </TableRow>
                              </TableHead>
                              <TableBody>
                                    {products.map((item, index) => (
                                          <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                          >
                                                <TableCell align="left">{index}</TableCell>
                                                <TableCell align="left">{item.productName}</TableCell>
                                                <TableCell align="left">
                                                      <img className="cus-img__item" src={item.productImage} alt="" />
                                                </TableCell>
                                                <TableCell align="left">
                                                      <span style={{ textDecoration: 'line-through' }}>
                                                            {formatPrice.format(item.price)}
                                                      </span>
                                                </TableCell>
                                                <TableCell align="left">
                                                      {formatPrice.format(item.discount)}
                                                </TableCell>
                                                <TableCell align="left">
                                                      {item.active === true ? 'Active' : 'Inactive'}
                                                </TableCell>
                                                <TableCell align="left">{item.quantity}</TableCell>
                                                <TableCell align="left">
                                                      {item.sale === true ? 'Sale' : 'Not Sale'}
                                                </TableCell>
                                                <TableCell align="left">
                                                      <IconButton onClick={() => handleOnUpdateClick(item.id)} color="success">
                                                            <EditIcon />
                                                      </IconButton>
                                                      <IconButton onClick={() => handleOnDeleteClick(item)} color="error">
                                                            <DeleteIcon />
                                                      </IconButton>
                                                </TableCell>
                                          </TableRow>
                                    ))}
                              </TableBody>
                        </Table>
                  </TableContainer>
            </div>
      );
}

export default ProductList;