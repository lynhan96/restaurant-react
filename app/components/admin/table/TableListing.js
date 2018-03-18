import React, { Component } from 'react'
import R from 'ramda'

import 'datatables.net'
import 'datatables.net-bs/js/dataTables.bootstrap'
import 'datatables.net-bs/css/dataTables.bootstrap.css'

import { isAdmin } from 'components/wrappers/isAdmin'
import TableContentLoading from 'components/admin/table/tableListElement/TableContentLoading'
import ErrorMessage from 'components/ErrorMessage'
import ListHeaderElement from 'components/admin/table/tableListElement/ListHeaderElement'
import TableHeader from 'components/admin/table/tableListElement/TableHeader'
import TableBody from 'components/admin/table/tableListElement/TableBody'

class TableListing extends Component {
  render() {
    const { sortByKey, error, loading, searchFunc, sortType, sortFieldName, deleteItem, tableHeader, datas, arrLink, viewHeader, dispatch } = this.props

    if (error) {
      return (
        <TableContentLoading
          message='Quá trình tải dữ liệu xảy ra lỗi!'
        />
      )
    }

    if (loading) {
      return (
        <div className='card'>
          <div className='card-header' data-background-color='purple'>
            <h4 className='title'>{viewHeader}</h4>
          </div>
          <div className='card-content table-responsive'>
            <ListHeaderElement
              dispatch={dispatch}
              searchFunc={searchFunc}
              arrLink={arrLink}
            />
            <TableContentLoading
              message='Đang tải dữ liệu ...'
            />
          </div>
        </div>
      )
    }

    return (
      <div className='card'>
        <div className='card-header' data-background-color='purple'>
          <h4 className='title'>{viewHeader}</h4>
        </div>
        <div className='card-content table-responsive'>
          <ListHeaderElement
            dispatch={dispatch}
            searchFunc={searchFunc}
            arrLink={arrLink}
          />
          {error && <ErrorMessage text={error} />}
          <table className='table table-hover'>
            <TableHeader
              tableHeader={tableHeader}
              sortFieldName={sortFieldName}
              sortType={sortType}
              dispatch={dispatch}
              datas={datas}
              sortBy={sortByKey}
            />
            <TableBody
              arrLink={arrLink}
              deleteItem={deleteItem}
              tableHeader={tableHeader}
              dispatch={dispatch}
              datas={datas}
            />
          </table>
        </div>
      </div>
    )
  }
}

export default R.pipe(
  isAdmin
)(TableListing)
