import React, { Component } from 'react'
import R from 'ramda'

import 'datatables.net'
import 'datatables.net-bs/js/dataTables.bootstrap'
import 'datatables.net-bs/css/dataTables.bootstrap.css'

import { isAdmin } from 'components/wrappers/isAdmin'
import ListHeaderElement from 'components/admin/table/tableListElement/ListHeaderElement'
import TableHeader from 'components/admin/table/tableListElement/TableHeader'
import TableBody from 'components/admin/table/tableListElement/TableBody'
import ReactPaginate from 'react-paginate'

class TableListing extends Component {
  constructor (props) {
    super(props)
    this.onChangePagination = this.onChangePagination.bind(this)
  }

  onChangePagination(data) {
    const { changePagination, sortFieldName, sortType, dispatch } = this.props
    const offset = data.selected
    changePagination(offset, sortFieldName, sortType, dispatch)
  }

  render() {
    const { totalPage, sortByKey, searchFunc, sortType, sortFieldName, deleteItem, tableHeader, datas, arrLink, viewHeader, dispatch } = this.props

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
          <div style={{ textAlign: 'center' }}>
            <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              onPageChange={this.onChangePagination}
              breakLabel={<a href=''>...</a>}
              breakClassName={'break-me'}
              pageCount={totalPage}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'} />
          </div>
        </div>
      </div>
    )
  }
}

export default R.pipe(
  isAdmin
)(TableListing)
