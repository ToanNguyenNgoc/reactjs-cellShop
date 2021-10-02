import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { db } from '../../../firebase/config';
import {Button} from 'react-bootstrap'

CategoryForm.propTypes = {
      handleOnsubmit: PropTypes.func,
      currentId: PropTypes.string,
};
CategoryForm.defaultProps={
      handleOnsubmit:null,
      currentId: '',
}

function CategoryForm(props) {
      const {handleOnsubmit, currentId} = props;
      const initialValues ={
            name:''
      }
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
      }, [currentId])

      const handleOnsubmitClick=(e)=>{
            e.preventDefault();
            if(handleOnsubmit){
                  handleOnsubmit(values);
            }
            setValues({...initialValues});
      }
      return (
            <div>
                  <form autoComplete="off" onSubmit={handleOnsubmitClick}>
                        <div>
                              <input
                                    placeholder="Enter category name..."
                                    name="name"
                                    value={values.name}
                                    onChange={handleInputChangeClick}
                                    required
                              />
                        </div>
                        <div>
                              <Button type="submit">
                                    {currentId ==='' ? 'Add new category' : 'Save category'}
                              </Button>
                        </div>
                  </form>
            </div>
      );
}

export default CategoryForm;