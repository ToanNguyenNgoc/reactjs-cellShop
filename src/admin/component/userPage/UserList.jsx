import React,{useState} from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../../commons/formatDate';
import './style.css';
import TextField from '@material-ui/core/TextField';
import useSearchTerm from '../../../customHooks/useSearchTerm'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';

UserList.propTypes = {
      users: PropTypes.array
};
UserList.defaultProps ={
      users:[]
}

function UserList(props) {
      const {users} = props;
      const [search, setSearch] = useState([]);

      const handleChange=(e)=>{
            e.preventDefault();
            setSearch(e.target.value);
      }
      const result = useSearchTerm(search, users)
      return (
            <div className="table-responsive mt-10">
                  <TextField id="standard-basic" label="Enter search..." onChange={handleChange} value={search} />
                  <div className="table-wrapper">
                        <TableContainer component={Paper}>
                              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                          <TableRow>
                                                <TableCell>#</TableCell>
                                                <TableCell align="left">Email</TableCell>
                                                <TableCell align="left">Create at</TableCell>
                                          </TableRow>
                                    </TableHead>
                                    <TableBody>
                                          {result.map((user, index) => (
                                                <TableRow
                                                      key={index}
                                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                      <TableCell align="left">{index}</TableCell>
                                                      <TableCell align="left">{user.email}</TableCell>
                                                      <TableCell align="left">
                                                            {formatDate(user.createdAt?.seconds)}
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

export default UserList;