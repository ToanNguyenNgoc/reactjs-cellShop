import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import useStyles from '../../../customHooks/useStyles';
import {useHistory} from 'react-router-dom'
import { AppContext } from '../../../context/AppProvider';
import formatDate from '../../../commons/formatDate';
import firebase from "firebase/app"
import 'firebase/firestore';
import './Banner.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Banner(props) {
      const classes = useStyles();
      const history = useHistory();
      const {bannerList} = useContext(AppContext);
      const handleGotoCreatePage=()=>{
            history.push('/Admin/banner-product/form-page');
      }
      const handleDeleteBanner =(id)=>{
            firebase
                  .firestore()
                  .collection("bannerProduct")
                  .doc(id)
                  .delete()
            toast.success('Deleted banner product !');
      }
      return (
            <div className="cus__category-page">
                  <div className="col-10 cus__category-page__content">
                        <Button
                              onClick={handleGotoCreatePage}
                              variant="contained"
                              color="secondary"
                              className={classes.button}
                              startIcon={<AddIcon />}
                        >
                              Create new banner product
                        </Button>
                        <table className="table table-responsive table-borderless">
                              <thead>
                                    <tr className="bg-light">
                                          <th scope="col" width="10%">#</th>
                                          <th scope="col" width="50%">Banner image</th>
                                          <th scope="col" width="20%">Create at</th>
                                          <th scope="col" width="20%"></th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {
                                          bannerList?.map((item, index) => (
                                                <tr key={item.id}>
                                                      <td>{index}</td>
                                                      <td>
                                                            <img className="ad-banner-product" src={item.bannerImageUrl} alt="" />
                                                      </td>
                                                      <td>
                                                            {formatDate(item.createdAt?.seconds)}
                                                      </td>
                                                      <td>
                                                            <Button
                                                                  onClick={()=>handleDeleteBanner(item.id)}
                                                                  variant="contained"
                                                                  color="secondary"
                                                            >
                                                                  Delete banner product
                                                            </Button>
                                                      </td>
                                                </tr>
                                          ))
                                    }
                              </tbody>
                        </table>
                  </div>
            </div>
      );
}

export default Banner;