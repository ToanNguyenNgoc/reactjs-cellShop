import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../../../context/AppProvider';
import useFirestore from '../../../customHooks/useFirestore';
import {Button} from '@mui/material';
import { addDocument } from '../../../firebase/services';
import {useHistory} from 'react-router-dom';
import {storage} from '../../../firebase/config'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Banner.css';

function BannerFormPage(props) {
      const [image, setImage] = useState(null)
      const [imageUrl, setImageUrl] = useState()
      const [progress, setProgress] = useState(0)
      const history = useHistory();
      const {categoryList} = useContext(AppContext);
      const [categoryId, setCategoryId] = useState('');
      const [productId, setProductId] = useState('');
      const handleCategorySelectChange=(e)=>{
            setCategoryId(e.target.value)
      }
      const handleProductSelectChange=(e)=>{
            setProductId(e.target.value)
      }
       //get product by category id
       const condition = useMemo(()=>({
            fieldName:'categoryId',
            operator:'==',
            compareValue:categoryId
      }),[categoryId]);
      const products = useFirestore('product', condition);
      //upload image
      const handleChange = e => {
            if (e.target.files[0]) {
                  setImage(e.target.files[0]);
            }
      }
      //console.log(image)
      const handleUpload = () => {
            if (image) {
                  const uploadTask = storage.ref(`images-banner/${image.name}`).put(image);
                  uploadTask.on(
                        "state_changed",
                        snapshot => {
                              const progress = Math.round(
                                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                              );
                              setProgress(progress);
                              toast.success('Upload image success ! ');
                        },
                        error => {
                              console.log(error);
                        },
                        () => {
                              storage
                                    .ref("images-banner")
                                    .child(image.name)
                                    .getDownloadURL()
                                    .then(url => {
                                          setImageUrl(url);
                                    });
                        }
                  );
            }else{
                  toast.warn('Please choose image !')
            }
      };
      //-------------------
      const handleOnsubmit=(e)=>{
            e.preventDefault();
            if(categoryId && productId && imageUrl){
                  addDocument('bannerProduct', {
                        productId: productId,
                        bannerImageUrl: imageUrl,
                  })
                  toast.success('Create banner success !');
                  history.push('/Admin/banner-product')
            }else{
                  toast.error('Create banner fail !');
            }
      }
      return (
            <div className="cus__category-page">
                  <div className="col-10 cus__category-page__content cus__form-product">
                        <div className="form__image">
                             {
                                   imageUrl?  <img src={imageUrl} alt="" /> :  <img src="https://icon-library.com/images/image-placeholder-icon/image-placeholder-icon-5.jpg" alt="" />
                             }
                              <div className="form__image-control">
                                    <progress value={progress} max="100"></progress>
                                    <br />
                                    <input type="file" onChange={handleChange} />
                                    <button onClick={handleUpload}>Tải lên</button>
                              </div>
                        </div>
                        <div className="field-group">
                              <label>Loại sản phẩm</label>
                              <select style={{ marginRight: '30px' }} className="col-4" value={categoryId} onChange={handleCategorySelectChange}>
                                    {categoryList.map((category) => (
                                          <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                              </select>
                        </div>
                        <div className="field-group">
                              <label>Tên sản phẩm</label>
                              <select value={productId} onChange={handleProductSelectChange}>
                                    {products.map((product) => (
                                          <option key={product.id} value={product.id}>{product.productName}</option>
                                    ))}
                              </select>
                        </div>
                        <form autoComplete="off" onSubmit={handleOnsubmit} className="ad-form__banner">
                              <Button className="submit-btn" type="submit" variant="contained" color="error">
                                    Create banner and back
                              </Button>
                        </form>
                  </div>
            </div>
      );
}

export default BannerFormPage;