import React, { useEffect, useState, useMemo, useContext } from 'react';
import { addDocument } from '../../../firebase/services';
import { AppContext } from '../../../context/AppProvider';
import { parseInt } from 'lodash';
import { useHistory, useParams } from 'react-router';
import { db } from '../../../firebase/config';
import {storage} from '../../../firebase/config'
import ProductForm from './ProductForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ProductFormPage(props) {
      const {id} = useParams();
      const {productList} = useContext(AppContext);
      const history = useHistory();
      const [categoryId, setCategoryId] = useState('');
      const [isCheckedActive, setIsCheckedActive] = useState(false);
      const [isCheckedSale, setIsCheckedSale] = useState(false);
      const[productDescription, setProductDescription] = useState('');
      const [image, setImage] = useState(null)
      const [imageUrl, setImageUrl] = useState()
      const [progress, setProgress] = useState(0)
      //handle upload image
      const handleChange=e=>{
            if (e.target.files[0]) {
                  setImage(e.target.files[0]);
            }
      }
      const handleUpload = () => {
            if (image) {
                  const uploadTask = storage.ref(`images/${image.name}`).put(image);
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
                                    .ref("images")
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
      const initialValues= useMemo(()=>({
            categoryId:'',
            productName:'',
            productDescription:'',
            price:'',
            discount:'',
            quantity:'',
      }),[])
      const [values, setValues] = useState(initialValues);
      const handleInputChangeClick=(e)=>{
            var {name, value} = e.target;
            setValues({
                  ...values,
                  [name]: value
            })
      }
      const currentProduct = productList.find(item => item.id === id);
      useEffect(() => {
            async function handleSetValues() {
                  if (id) {
                        setValues({...currentProduct})
                        setCategoryId(currentProduct.categoryId);
                        setIsCheckedActive(currentProduct.active);
                        setIsCheckedSale(currentProduct.sale);
                        setProductDescription(currentProduct.productDescription);
                        setImageUrl(currentProduct.productImage)
                  } else {
                        setValues({
                              ...initialValues
                        })
                  }
            }
            handleSetValues();
      }, [currentProduct, id, initialValues]) 
      const handleSelectChange=(e)=>{
            setCategoryId(e.target.value);
      }
      const handleCKEditChange=(e, editor)=>{
            const data = editor.getData();
            setProductDescription(data);
      }
      const dataValues = {
            categoryId: categoryId,
            productName: values.productName,
            productImage: imageUrl,
            productDescription: productDescription,
            price: parseInt(values.price),
            discount: parseInt(values.discount),
            active: isCheckedActive,
            quantity: parseInt(values.quantity),
            sale: isCheckedSale,
            percent: 100 - Math.floor(values.discount / values.price * 100)
      }
      const handleOnsubmitClick=(e)=>{
            e.preventDefault();
            if(id){
                  db.collection('product').doc(id).update(dataValues);
                  toast.success('Upload product details !');
                  history.push('/Admin/product');
            } else {
                  if (imageUrl) {
                        addDocument('product', {
                              categoryId: categoryId,
                              productName: values.productName,
                              productImage: imageUrl,
                              productDescription: productDescription,
                              price: parseInt(values.price),
                              discount: parseInt(values.discount),
                              active: isCheckedActive,
                              quantity: parseInt(values.quantity),
                              sale: isCheckedSale,
                              percent: 100 - Math.floor(values.discount / values.price * 100),
                              totalSold: 0
                        });
                        toast.success('Created new product !')
                        history.push('/Admin/product');
                  } else {
                        toast.warn('Please choose image !')
                  }
            }
            setCategoryId('');
            setValues({...initialValues})
      }
      return (
            <div className="cus__product--page">
                  <div className="col-10 cus__product--page__content cus-form">
                        <div className="form__image">
                              {
                                    imageUrl ? <img src={imageUrl} alt="" /> : <img src="https://icon-library.com/images/image-placeholder-icon/image-placeholder-icon-5.jpg" alt="" />
                              }
                              <div className="form__image-control">
                                    <progress value={progress} max="100"></progress>
                                    <br />
                                    <input type="file" onChange={handleChange} />
                                    <button onClick={handleUpload}>Tải lên</button>
                              </div>
                        </div>
                        <ProductForm
                              handleOnsubmitClick={handleOnsubmitClick}
                              id={id}
                              isCheckedActive={isCheckedActive}
                              setIsCheckedActive={setIsCheckedActive}
                              isCheckedSale={isCheckedSale}
                              setIsCheckedSale={setIsCheckedSale}
                              values={values}
                              handleInputChangeClick={handleInputChangeClick}
                              categoryId={categoryId}
                              handleSelectChange={handleSelectChange}
                              productDescription={productDescription}
                              handleCKEditChange={handleCKEditChange}
                        />
                  </div>
            </div>
      );
}

export default ProductFormPage;