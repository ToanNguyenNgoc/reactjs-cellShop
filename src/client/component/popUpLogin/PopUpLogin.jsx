import React from 'react';
import PropTypes from 'prop-types';
import {addDocument} from '../../../firebase/services';
import firebase,{auth} from '../../../firebase/config';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import './PopUpLogin.css'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

PopUpLogin.propTypes = {
      setPopUpLoginDialog:PropTypes.func
};
PopUpLogin.defaultProps={
      setPopUpLoginDialog:null
}
const googleProvider =new firebase.auth.GoogleAuthProvider();
function PopUpLogin(props) {
      const {popUpLoginDialog, setPopUpLoginDialog} = props;
      const handleClose=()=>{
            setPopUpLoginDialog(false)
      }
      //handle login
      const handleLogin=async(provider)=>{
            try {
                  setPopUpLoginDialog(false)
                  const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
                  if (additionalUserInfo?.isNewUser) {
                        addDocument('customers', {
                              displayName: user.displayName,
                              email: user.email,
                              photoURL: user.photoURL,
                              uid: user.uid,
                              providerId: additionalUserInfo.providerId
                        })
                  }
                  
            } catch(error) {
                  console.log(error);
            }
      }
      return (
            <Dialog
                  open={popUpLoginDialog}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
            >
                  <DialogTitle id="alert-dialog-slide-title">{"????ng nh???p"}</DialogTitle>
                  <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                             S??? d???ng t??i kho???n Google ????? ????ng nh???p ????? c?? th??? s??? d???ng c??c d???ch v??? c???a Shop
                        </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                        <Button onClick={()=> handleLogin(googleProvider)} className="cl-cus__dialog-btn" variant="contained" color="primary">
                              ????ng nh???p v???i t??i kho???n Google
                        </Button>
                        <Button onClick={handleClose} className="cl-cus__dialog-btn" variant="contained" color="secondary">
                              H???y
                        </Button>
                  </DialogActions>
            </Dialog>
      );
}

export default PopUpLogin;