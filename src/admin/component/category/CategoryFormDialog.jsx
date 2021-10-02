import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { db } from '../../../firebase/config';


CategoryFormDialog.propTypes = {
      openDialog: PropTypes.bool,
      handleCloseDialog: PropTypes.func,
      handleOnsubmit: PropTypes.func,
      currentId: PropTypes.string,
};
CategoryFormDialog.defaultProps={
      openDialog: false,
      handleCloseDialog: null,
      handleOnsubmit:null,
      currentId: '',
}

function CategoryFormDialog(props) {
      const {openDialog, handleCloseDialog, handleOnsubmit, currentId} = props;
      const initialValues=useMemo(()=>({
            name:''
      }),[])
      const [values, setValues] = useState(initialValues);
      const handleInputChangeClick=(e)=>{
            var {name, value} = e.target;
            setValues({
                  ...values,
                  [name]: value
            })
      }

      const getLinkById=async(id)=>{
            const doc = await db.collection('category').doc(id).get();
            setValues({...doc.data()})
      }

      useEffect(()=>{
            async function handleSetValues(){
                  if(currentId ===''){
                        setValues({
                              ...initialValues
                        })
                  }else{
                        getLinkById(currentId);
                  }
            }
            handleSetValues();
      }, [currentId, initialValues])

      const handleOnsubmitClick=(e)=>{
            e.preventDefault();
            if(handleOnsubmit){
                  handleOnsubmit(values);
            }
            setValues({...initialValues});
            if(handleCloseDialog){
                  handleCloseDialog(false);
            }
      }
      //Handle Dialog
      const closeDialog=()=>{
            if(handleCloseDialog){
                  handleCloseDialog(false);
            }
      }
      return (
            <div>
                  <Dialog
                        open={openDialog}
                        // onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                  >
                        <form action="" autoComplete="off" onSubmit={handleOnsubmitClick}>
                              <DialogTitle id="alert-dialog-title">{"Create new category"}</DialogTitle>
                              <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                          <div>
                                                <Input
                                                      placeholder="Enter category name..."
                                                      name="name"
                                                      value={values.name}
                                                      onChange={handleInputChangeClick}
                                                      required
                                                />
                                          </div>
                                    </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                    <Button onClick={closeDialog} color="primary">
                                          Cancel
                                    </Button>
                                    <Button type="submit" color="primary" autoFocus>
                                          {currentId === '' ? 'Add new category' : 'Save category'}
                                    </Button>
                              </DialogActions>
                        </form>
                  </Dialog>
            </div>
      );
}

export default CategoryFormDialog;