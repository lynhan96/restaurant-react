import React, { Component } from 'react'
import R from 'ramda'
import { Link } from 'react-router'
import moment from 'moment'

import 'datatables.net'
import 'datatables.net-bs/js/dataTables.bootstrap'
import 'datatables.net-bs/css/dataTables.bootstrap.css'

import { isAdmin } from 'components/wrappers/isAdmin'

class TableEditItem extends Component {
  render() {
    const { indexData, editLabelHeader, editHeader, data, subHeader, arrLink } = this.props

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
                <form>
                  {editLabelHeader.map((item, index) => {
                    if (item.fieldName === 'birthday' || item.fieldName === 'createdAt') {
                      data[item.fieldName] = moment.utc(data[item.fieldName]).add(7, 'hours').format('YYYY-MM-DD hh:mm:ss')
                    }
                    return (
                      <div className='col-md-6' key={index}>
                        <div className='form-group label-floating' style={{ marginTop: '0' }}>
                          <label>{item.viewTitle}</label>
                          <input className='form-control' type='text' value={data[item.fieldName]}/>
                        </div>
                      </div>
                    )
                  })}
                </form>
              </div>
            </div>
        </div>
      </div>
    )
  }
}

export default R.pipe(
  isAdmin
)(TableEditItem)

const style = {
  buttonMargin: {
    margin: '5px 15px 10px 15px'
  }
}
