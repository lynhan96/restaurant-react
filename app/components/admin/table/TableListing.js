import React, { Component } from 'react'
import R from 'ramda'
import { Link } from 'react-router'

import 'datatables.net'
import 'datatables.net-bs/js/dataTables.bootstrap'
import 'datatables.net-bs/css/dataTables.bootstrap.css'

import { isAdmin } from 'components/wrappers/isAdmin'

class TableListing extends Component {
  render() {
    const { header, datas, arrLink } = this.props

    return (
      <div className='card-content table-responsive'>
        <div>
          <Link to='/' className='btn btn-success pull-left btn-round'>
            Thêm dữ liệu
            <div className='ripple-container'></div>
          </Link>
        </div>
        <table className='table table-hover'>
          <thead className='text-primary'>
            <tr>
              {header.map((item, index) => <th key={index}>{ item.viewTitle }</th>)}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {datas.map(function(item, itemIndex) {
              return (
                <tr key={itemIndex}>
                  {header.map(function(headerItem, headerIndex) {
                    return <td key={headerIndex}>{item[headerItem.fieldName]}</td>
                  })}
                  <td className='td-actions text-right'>
                    <button type='button' rel='tooltip' title='Xem thông thi tiết' className='btn btn-primary btn-simple btn-xs'>
                      <i className='material-icons'>visibility</i>
                    </button>
                    <button type='button' rel='tooltip' title='Chỉnh sửa dữ liệu' className='btn btn-primary btn-simple btn-xs'>
                      <i className='material-icons'>edit</i>
                    </button>
                    <button type='button' rel='tooltip' title='Xóa dữ liệu' className='btn btn-danger btn-simple btn-xs'>
                      <i className='material-icons'>close</i>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default R.pipe(
  isAdmin
)(TableListing)
