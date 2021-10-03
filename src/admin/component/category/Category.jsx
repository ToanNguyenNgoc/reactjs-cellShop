import React, { useContext, useEffect, useState } from 'react';
import CategoryList from './CategoryList'
import { db } from '../../../firebase/config';
import { addDocument } from '../../../firebase/services';
import CategoryPagination from './CategoryPagination';
import Button from '@material-ui/core/Button';
import CategoryFormDialog from './CategoryFormDialog';
import { AppContext } from '../../../context/AppProvider';
import useSearchTerm from '../../../customHooks/useSearchTerm'
import TextField from '@material-ui/core/TextField';
import './style.css';

function Category(props) {
      const {categoryList} = useContext(AppContext);
      const [categoryListLength, setCategoryListLength] = useState();
      const [currentId, setCurrentId] = useState('');
      const [currentPage, setCurrentPage] = useState(1);
      const [categoriesPerPage] = useState(6);
      const [currentCategoryPage, setCurrentCategoryPage] = useState([]);
      const [search, setSearch] = useState('');
      const [open, setOpen] = useState(false);
      const handleOnSaveOrUpdate=(values)=>{
            if(currentId===''){
                  addDocument('category',{
                        name: values.name
                  })
            }else{
                  db.collection('category').doc(currentId).update(values);
                  setCurrentId('');
            }
      }     

      const handleSetCurrentId=(id)=>{
            setCurrentId(id);
            setOpen(true);
      }
      //search
      const handleChange=(e)=>{
            e.preventDefault();
            setSearch(e.target.value);
      }
      const filterCategory = useSearchTerm(search, categoryList)
      useEffect(()=>{
            async function setCurrentCategoriesPage(){
                  if (filterCategory) {
                        const indexOfLastCategories = currentPage * categoriesPerPage;
                        const indexOfFirstCategories = indexOfLastCategories - categoriesPerPage;
                        const currentCategoryList=filterCategory.slice(indexOfFirstCategories, indexOfLastCategories);
                        setCurrentCategoryPage(currentCategoryList);
                        setCategoryListLength(filterCategory.length);
                        return;
                  }
            }
            setCurrentCategoriesPage();
      },[categoriesPerPage, filterCategory, currentPage])
      const handleChangePageNumber=(number)=>{
            setCurrentPage(number);
      }
      //Dialog
      const handOpenCategoryFormDialog=()=>{
            setOpen(true);
      }
      const handCloseCategoryFormDialog=()=>{
            setOpen(false);
      }
      
      return (
            <div className="cus__category-page">
                  <div className="col-10 cus__category-page__content">
                        <div className="cus__page__action">
                              <Button
                                    onClick={handOpenCategoryFormDialog}
                                    variant="contained"
                                    color="secondary"
                              >
                                    Add new category
                              </Button>
                              <TextField id="standard-basic" label="Enter category name..." onChange={handleChange} value={search} />
                        </div>
                        <CategoryFormDialog
                              openDialog={open}
                              handleCloseDialog={handCloseCategoryFormDialog}
                              handleOnsubmit={handleOnSaveOrUpdate}
                              currentId={currentId}
                        />
                        <CategoryList
                              categories={currentCategoryPage}
                              handleOnUpdate={handleSetCurrentId}
                        />
                        <CategoryPagination
                              categoriesPerPage={categoriesPerPage}
                              totalCategories={categoryListLength}
                              handleChangePageNumber={handleChangePageNumber}
                        />
                  </div>
            </div>
      );
}

export default Category;