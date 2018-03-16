import React, { Component } from 'react'
import R from 'ramda'
import { Link } from 'react-router'
import { reduxForm } from 'redux-form'
import Navigator from 'lib/Navigator'

import EditForm from 'components/form/EditForm'
import { isAdmin } from 'components/wrappers/isAdmin'

class TableEditItem extends Component {
  render() {
    const { submitEdit, indexData, editLabelHeader, editHeader, data, subHeader, arrLink } = this.props

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
                  <Link to={arrLink.view + '?index=' + indexData} className='btn btn-primary btn-round' style={style.buttonMargin}>
                    Thông tin chi tiết
                  </Link>
                  <Link to='/' className='btn btn-danger btn-round' style={style.buttonMargin}>
                    Xóa dữ liệu
                  </Link>
                </div>
                <DecoratedEditForm
                  data={data}
                  editLabelHeader={editLabelHeader}
                  onSubmit={submitEdit}
                />
              </div>
            </div>
        </div>
      </div>
    )
  }
}

const DecoratedEditForm = reduxForm({
  form: 'edit',
  // Separate submitLogin into another file
  // since the function is decoupled from Login
  // redirect after submit is successful
  onSubmitSuccess: () => Navigator.push('employees')
})(EditForm)

export default R.pipe(
  isAdmin
)(TableEditItem)

const style = {
  buttonMargin: {
    margin: '5px 15px 10px 15px'
  }
}
