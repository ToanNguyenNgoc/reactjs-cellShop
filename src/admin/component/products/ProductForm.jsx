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
                        <label>Áp dụng giảm giá :</label>
                        <Checkbox
                              color="primary"
                              name="sale"
                              checked={isCheckedSale}
                              onChange={(e) => { setIsCheckedSale(e.target.checked) }}
                        />
                  </div>
                  <div className="field-group">
                        <label>Loại sản phẩm</label>
                        <select value={categoryId} onChange={handleSelectChange}>
                              {categoryList.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                              ))}
                        </select>
                  </div>
                  <div className="field-group">
                        <label>Tên sản phẩm</label>
                        <input placeholder="Tên sản phẩm..."
                              name="productName"
                              value={values.productName}
                              onChange={handleInputChangeClick}
                              required
                        />
                  </div>
                  <div className="field-group">
                        <label>Giá niêm yết</label>
                        <input placeholder="Nhập giá niêm yết..."
                              type="number"
                              name="price"
                              value={values.price}
                              onChange={handleInputChangeClick}
                              required
                        />
                  </div>
                  <div className="field-group">
                        <label>Gảm giá</label>
                        <input placeholder="Nhập giá khuyến mại..."
                              type="number"
                              name="discount"
                              value={values.discount}
                              onChange={handleInputChangeClick}
                        />
                  </div>
                  <div className="field-group">
                        <label>Số lượng</label>
                        <input placeholder="Nhập số lượng..."
                              type="number"
                              name="quantity"
                              value={values.quantity}
                              onChange={handleInputChangeClick}
                              required
                        />
                  </div> 
                  <div className="field-group">
                        <label>Mô tả</label>
                        <CKEditor editor={ClassicEditor} data={productDescription} onChange={handleCKEditChange} required />
                  </div>
            </form>
      );
}

export default ProductForm;