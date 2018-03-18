import React from 'react'
import R from 'ramda'
import ReactQueryParams from 'react-query-params'

import { connect } from 'react-redux'

import { isAdmin } from 'components/wrappers/isAdmin'
import { tableHeader, fetchEmployees, deleteEmployee, sortByKey, searchByKeyword, changePagination } from '../../../lib/actions/employee'
import TableListing from 'components/admin/table/TableListing'
import { updateActiveLink } from 'ducks/admin'
import ContentLoading from 'components/ContentLoading'

class EmployeeList extends ReactQueryParams {
  componentDidMount() {
    this.props.dispatch(fetchEmployees())
    this.props.dispatch(updateActiveLink('employees'))
  }

  render() {
    const { totalPage, sortType, sortBy, error, employees, dispatch } = this.props

    if (error) {
      return (
        <ContentLoading
          error={error}
          message='Quá trình tải dữ liệu xảy ra lỗi!'
        />
      )
    }

    return (
      <div className='content'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-12'>
              <TableListing
                datas={employees}
                tableHeader={tableHeader()}
                actionLink='/employees'
                viewHeader='Danh sách Nhân viên'
                arrLink={{ create: 'employee-create', edit: 'employee-edit', view: 'employee-view', list: 'employees' }}
                deleteItem={deleteEmployee}
                dispatch={dispatch}
                sortByKey={sortByKey}
                sortFieldName={sortBy}
                sortType={sortType}
                searchFunc={searchByKeyword}
                error={error}
                changePagination={changePagination}
                totalPage={totalPage}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  employees: state.employee.items,
  loading: state.employee.loading,
  error: state.employee.error,
  sortBy: state.employee.sortBy,
  sortType: state.employee.sortType,
  totalPage: state.employee.totalPage
})

export default R.pipe(
  connect(mapStateToProps),
  isAdmin
)(EmployeeList)
