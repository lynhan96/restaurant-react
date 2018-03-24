import React, { Component } from 'react'
import R from 'ramda'

import Navigator from 'lib/Navigator'
import { showConfirmAlertDeleteItem } from '../../../../lib/actions/showNotification'
import { isAdmin } from 'components/wrappers/isAdmin'

const goto = (url) => () => Navigator.push(url)

class TableBody extends Component {
  render() {
    const { arrLink, dispatch, deleteItem, tableHeader, datas } = this.props

    return (
      <tbody>
        {datas.map(function(item, itemIndex) {
          return (
            <tr key={itemIndex}>
              {tableHeader.map(function(headerItem, headerIndex) {
                if (headerItem.fieldName === 'isView' && item[headerItem.fieldName] === true) {
                  return <td key={headerIndex}>Có</td>
                }

                if (headerItem.fieldName === 'isView' && item[headerItem.fieldName] === false) {
                  return <td key={headerIndex}>Không</td>
                }

                return <td key={headerIndex}>{item[headerItem.fieldName]}</td>
              })}
              <td className='td-actions text-right'>
                <button onClick={goto(arrLink.view + '?index=' + itemIndex)} type='button' rel='tooltip' title='Xem thông thi tiết' className='btn btn-primary btn-simple btn-xs'>
                  <i className='material-icons'>visibility</i>
                </button>
                <button onClick={goto(arrLink.edit + '?index=' + itemIndex)} type='button' rel='tooltip' title='Chỉnh sửa dữ liệu' className='btn btn-primary btn-simple btn-xs'>
                  <i className='material-icons'>edit</i>
                </button>
                <button onClick={showConfirmAlertDeleteItem(deleteItem, item.id, dispatch, datas, itemIndex, 'list')}type='button' rel='tooltip' title='Xóa dữ liệu' className='btn btn-danger btn-simple btn-xs'>
                  <i className='material-icons'>close</i>
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    )
  }
}

export default R.pipe(
  isAdmin
)(TableBody)
