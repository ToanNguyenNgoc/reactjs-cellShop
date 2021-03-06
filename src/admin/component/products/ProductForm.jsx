import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { AppContext } from '../../../context/AppProvider';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

ProductForm.propTypes = {
      id: PropTypes.string,
      isCheckedActive:PropTypes.bool,
      setIsCheckedActive:PropTypes.func,
      isCheckedSale:PropTypes.bool,
      setIsCheckedSale:PropTypes.func,
      values:PropTypes.object,
      handleInputChangeClick:PropTypes.func,
      categoryId:PropTypes.string,
      handleSelectChange:PropTypes.func,
      productDescription:PropTypes.string,
      handleCKEditChange:PropTypes.func,

      handleOnsubmitClick:PropTypes.func,
};
ProductForm.defaultProps={
      id:'',
      isCheckedActive:false,
      setIsCheckedActive:null,
      isCheckedSale:false,
      setIsCheckedSale: null,
      values:{},
      handleInputChangeClick:null,
      categoryId:'',
      handleSelectChange:null,
      productDescription:'',
      handleCKEditChange:null,

      handleOnsubmitClick:{}
}

function ProductForm(props) {
      const {categoryList} = useContext(AppContext);
      const {
            id, 
            isCheckedActive, 
            setIsCheckedActive, 
            setIsCheckedSale, 
            isCheckedSale,
            categoryId,
            handleSelectChange, 
            values, 
            handleInputChangeClick,
            productDescription,
            handleCKEditChange,
            handleOnsubmitClick
      } = props;
      return (
            <form className="cus__form-product" autoComplete="off" onSubmit={handleOnsubmitClick}>
                  <Button className="submit-btn" type="submit" variant="contained" color="secondary">
                        {id ? 'Update and back' : ' Create and back'}
                  </Button>
                  <div>
                        <label>Active :</label>
                        <Checkbox
                              color="primary"
                              name="active"
                              checked={isCheckedActive}
                              onChange={(e) => { setIsCheckedActive(e.target.checked) }}
                        />
                        <label>??p d???ng gi???m gi?? :</label>
                        <Checkbox
                              color="primary"
                              name="sale"
                              checked={isCheckedSale}
                              onChange={(e) => { setIsCheckedSale(e.target.checked) }}
                        />
                  </div>
                  <div className="field-group">
                        <label>Lo???i s???n ph???m</label>
                        <select value={categoryId} onChange={handleSelectChange}>
                              {categoryList.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                              ))}
                        </select>
                  </div>
                  <div className="field-group">
                        <label>T??n s???n ph???m</label>
                        <input placeholder="T??n s???n ph???m..."
                              name="productName"
                              value={values.productName}
                              onChange={handleInputChangeClick}
                              required
                        />
                  </div>
                  <div className="field-group">
                        <label>Gi?? ni??m y???t</label>
                        <input placeholder="Nh???p gi?? ni??m y???t..."
                              type="number"
                              name="price"
                              value={values.price}
                              onChange={handleInputChangeClick}
                              required
                        />
                  </div>
                  <div className="field-group">
                        <label>G???m gi??</label>
                        <input placeholder="Nh???p gi?? khuy???n m???i..."
                              type="number"
                              name="discount"
                              value={values.discount}
                              onChange={handleInputChangeClick}
                        />
                  </div>
                  <div className="field-group">
                        <label>S??? l?????ng</label>
                        <input placeholder="Nh???p s??? l?????ng..."
                              type="number"
                              name="quantity"
                              value={values.quantity}
                              onChange={handleInputChangeClick}
                              required
                        />
                  </div> 
                  <div className="field-group">
                        <label>M?? t???</label>
                        <CKEditor editor={ClassicEditor} data={productDescription} onChange={handleCKEditChange} required />
                  </div>
            </form>
      );
}

export default ProductForm;