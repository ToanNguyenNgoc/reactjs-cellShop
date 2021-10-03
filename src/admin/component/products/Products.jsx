import React, { useContext, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router';
import firebase from 'firebase/app'
import ProductList from './ProductList'
import useStyles from '../../../customHooks/useStyles';
import { AppContext } from '../../../context/AppProvider';
import useSearchTerm from '../../../customHooks/useSearchTerm'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import ProductPagination from './ProductPagination';
import './style.css'
import TextField from '@material-ui/core/TextField';

function Products(props) {
      const classes = useStyles();
      const history = useHistory();
      const {productList} = useContext(AppContext);
      const [productListLength, setProductListLength] = useState();
      const [currentPage, setCurrentPage] = useState(1);
      const [productPerPage] = useState(5);
      const [currentProductPage, setCurrentProductPage] = useState([]);
      const [search, setSearch] = useState('');

      const handleGotoCreatePage=()=>{
            const url='/Admin/product/form-page';
            history.push(url);
      }
      const handleOnDetailPage=(id)=>{
            const url = `/Admin/product/product-details/${id}`;
            history.push(url);
      }
      const handleOnDelete = (product) => {
            confirmAlert({
                  title: 'Confirm to delete',
                  message: `Are you sure to delete : ${product.productName} ?`,
                  buttons: [
                        {
                              label: 'Yes',
                              onClick: () => {
                                    firebase
                                          .firestore()
                                          .collection("product")
                                          .doc(product.id)
                                          .delete()
                              }
                        },
                        {
                              label: 'Cancel',
                        }
                  ]
            });

      }
      const handleOnUpdate =(id)=>{
            const url= `/Admin/product/form-page/${id}`;
            history.push(url);
      }
      const handleChange=(e)=>{
            e.preventDefault();
            setSearch(e.target.value);
      }
      const filterProduct = useSearchTerm(search, productList)
      useEffect(()=>{
            async function setCurrentProductsPage(){
                  if (filterProduct) {
                        const indexOfLastProduct = currentPage * productPerPage;
                        const indexOfFirstProduct = indexOfLastProduct - productPerPage;
                        const currentCategoryList=filterProduct.slice(indexOfFirstProduct, indexOfLastProduct);
                        setCurrentProductPage(currentCategoryList);
                        setProductListLength(filterProduct.length);
                        return;
                  }
            }
            setCurrentProductsPage();
      },[productPerPage, filterProduct, currentPage])
      const handleChangePage=(number)=>{
            setCurrentPage(number);
      }
      return (
            <div className="cus__product--page">
                  <div className="col-10 cus__product--page__content">
                        <div className="cus__page__action">
                              <Button
                                    onClick={handleGotoCreatePage}
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<AddIcon />}
                              >
                                    Create new product
                              </Button>
                              <TextField id="standard-basic" label="Enter product name..." onChange={handleChange} value={search} />
                        </div>
                        <ProductList
                              products={currentProductPage}
                              onDetail={handleOnDetailPage}
                              onDelete={handleOnDelete}
                              onUpdate={handleOnUpdate}
                        />
                        <ProductPagination
                              productPerPage={productPerPage}
                              totalProduct={productListLength}
                              handleChangePageNumber={handleChangePage}
                        />
                  </div>
            </div>
      );
}

export default Products;