import React, { Component } from 'react'
import R from 'ramda'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'

import EditForm from 'components/form/EditForm'
import { isAdmin } from 'components/wrappers/isAdmin'
import { showConfirmAlertDeleteItem } from '../../../lib/actions/showNotification'

class TableEditItem extends Component {
  render() {
    const { selectFieldData, dispatch, deleteItem, submitEdit, itemIndex, editFieldInfo, editHeader, items, subHeader, arrLink } = this.props

    return (
      <div className='row'>
        <div className='col-md-2'></div>
        <div className='col-md-8'>
            <div className='card'>
              <div className='card-header' data-background-color='purple'>
                <h4 className='title'>{editHeader}</h4>
                <p className='category'>{subHeader}</p>
              </div>
              <div className='card-content'>
                <div style={{ textAlign: 'center' }}>
                  <Link to={arrLink.list} className='btn btn-success btn-round' style={style.buttonMargin}>
                    Trở lại
                  </Link>
                  <Link to={arrLink.view + '?index=' + itemIndex} className='btn btn-primary btn-round' style={style.buttonMargin}>
                    Thông tin chi tiết
                  </Link>
                  <button onClick={showConfirmAlertDeleteItem(deleteItem, items[itemIndex].id, dispatch, items, itemIndex, 'edit')} type='button' className='btn btn-danger btn-round' style={style.buttonMargin}>
                    Xóa dữ liệu
                  </button>
                </div>
                <DecoratedEditForm
                  itemIndex={itemIndex}
                  items={items}
                  editFieldInfo={editFieldInfo}
                  onSubmit={submitEdit}
                  selectFieldData={selectFieldData}
                />
              </div>
            </div>
        </div>
      </div>
    )
  }
}

const DecoratedEditForm = reduxForm({
  form: 'edit'
})(EditForm)

export default R.pipe(
  isAdmin
)(TableEditItem)

const style = {
  buttonMargin: {
    margin: '5px 15px 10px 15px'
  }
}
