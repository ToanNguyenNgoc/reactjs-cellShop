import React from 'react';
import PropTypes from 'prop-types';
import firebase from "firebase/app"
import 'firebase/firestore';
import formatDate from '../../../commons/formatDate';
import './style.css';
import {IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

CategoryList.propTypes = {
      categories: PropTypes.any,
      handleOnUpdate: PropTypes.func,
};
CategoryList.defaultProps={
      categories:[],
      handleOnUpdate: null
}
function CategoryList(props) {
      const { categories, handleOnUpdate } = props;
      const handleOnDeleteClick = (id) => {
            firebase
                  .firestore()
                  .collection("category")
                  .doc(id)
                  .delete()
      }
      const handleOnUpdateClick = (id) => {
            if (handleOnUpdate) {
                  handleOnUpdate(id);
            }
      }
      return (
            <div className="table-wrapper">
                  <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                              <TableHead>
                                    <TableRow>
                                          <TableCell>#</TableCell>
                                          <TableCell align="left">Category name</TableCell>
                                          <TableCell align="left">Created At</TableCell>
                                          <TableCell align="left">Options</TableCell>
                                    </TableRow>
                              </TableHead>
                              <TableBody>
                                    {categories.map((item, index) => (
                                          <TableRow
                                                key={item.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                          >
                                                <TableCell component="th" scope="row">
                                                      {index}
                                                </TableCell>
                                                <TableCell align="left">
                                                      {item.name}
                                                </TableCell>
                                                <TableCell align="left">
                                                      {formatDate(item.createdAt?.seconds)}
                                                </TableCell>
                                                <TableCell align="left">
                                                      <IconButton onClick={() => handleOnUpdateClick(item.id)} color="success">
                                                            <EditIcon />
                                                      </IconButton>
                                                      <IconButton onClick={() => handleOnDeleteClick(item.id)} color="error">
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

export default CategoryList;