import React, { Component } from 'react'
import R from 'ramda'
import { Link } from 'react-router'

import 'datatables.net'
import 'datatables.net-bs/js/dataTables.bootstrap'
import 'datatables.net-bs/css/dataTables.bootstrap.css'

import { isAdmin } from 'components/wrappers/isAdmin'
import Navigator from 'lib/Navigator'
import { showConfirmAlertDeleteItem } from '../../../lib/actions/showNotification'

const goto = (url) => () => Navigator.push(url)

class TableListing extends Component {
  constructor (props) {
    super(props)
    this.sortBy = this.props.sortBy.bind(this)
  }

  render() {
    const { sortType, sortFieldName, deleteItem, tableHeader, datas, arrLink, viewHeader, dispatch } = this.props
    let iconName = 'vertical_align_bottom'

    if (sortType === 'ZtoA') {
      iconName = 'vertical_align_top'
    }

    return (
      <div className='card'>
        <div className='card-header' data-background-color='purple'>
          <h4 className='title'>{viewHeader}</h4>
        </div>
        <div className='card-content table-responsive'>
          <div>
            <Link to={arrLink.create} className='btn btn-success pull-left btn-round'>
              Thêm dữ liệu
              <div className='ripple-container'></div>
            </Link>
          </div>
          <table className='table table-hover'>
            <thead className='text-primary'>
              <tr>
                {tableHeader.map((item, index) => {
                  return (
                    <th key={index}>
                      <Link to='#' onClick={e => { e.preventDefault(); this.sortBy(datas, item.fieldName, sortFieldName, sortType, dispatch) }}>
                        { item.viewTitle }
                      </Link>
                      <i className={sortFieldName === item.fieldName ? 'material-icons sort-icon-active' : 'material-icons'} style={style.iconStyle}>{iconName}</i>
                    </th>
                  )
                })}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {datas.map(function(item, itemIndex) {
                return (
                  <tr key={itemIndex}>
                    {tableHeader.map(function(headerItem, headerIndex) {
                      return <td key={headerIndex}>{item[headerItem.fieldName]}</td>
                    })}
                    <td className='td-actions text-right'>
                      <button onClick={goto(arrLink.view + '?index=' + itemIndex)} type='button' rel='tooltip' title='Xem thông thi tiết' className='btn btn-primary btn-simple btn-xs'>
                        <i className='material-icons'>visibility</i>
                      </button>
                      <button onClick={goto(arrLink.edit + '?index=' + itemIndex)} type='button' rel='tooltip' title='Chỉnh sửa dữ liệu' className='btn btn-primary btn-simple btn-xs'>
                        <i className='material-icons'>edit</i>
                      </button>
                      <button onClick={showConfirmAlertDeleteItem(deleteItem, item.id, dispatch, datas, itemIndex)}type='button' rel='tooltip' title='Xóa dữ liệu' className='btn btn-danger btn-simple btn-xs'>
                        <i className='material-icons'>close</i>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default R.pipe(
  isAdmin
)(TableListing)

const style = {
  iconStyle: {
    fontSize: '14px',
    marginLeft: '5px',
    display: 'none'
  }
}