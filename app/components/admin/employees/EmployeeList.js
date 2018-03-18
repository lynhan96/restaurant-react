import React from 'react'
import R from 'ramda'
import ReactQueryParams from 'react-query-params'

import 'datatables.net'
import 'datatables.net-bs/js/dataTables.bootstrap'
import 'datatables.net-bs/css/dataTables.bootstrap.css'
import { connect } from 'react-redux'

import { isAdmin } from 'components/wrappers/isAdmin'
import { tableHeader, fetchEmployees, deleteEmployee, sortBy } from '../../../lib/actions/employee'
import TableListing from 'components/admin/table/TableListing'
import { updateActiveLink } from 'ducks/admin'
import ErrorMessage from 'components/ErrorMessage'
import ContentLoading from 'components/ContentLoading'

class EmployeeList extends ReactQueryParams {
  componentDidMount() {
    this.props.dispatch(fetchEmployees())
    this.props.dispatch(updateActiveLink('employees'))
  }

  render() {
    const { error, loading, employees, dispatch } = this.props

    if (error) {
      return (
        <ContentLoading
          message='Quá trình tải dữ liệu xảy ra lỗi!'
        />
      )
    }

    if (loading) {
      return (
        <ContentLoading
          message='Đang tải dữ liệu ...'
        />
      )
    }

    return (
      <div className='content'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-12'>
              {error && <ErrorMessage text={error} />}
              <TableListing
                datas={employees}
                tableHeader={tableHeader()}
                actionLink='/employees'
                viewHeader='Danh sách Nhân viên'
                arrLink={{ create: 'employee-create', edit: 'employee-edit', view: 'employee-view', list: 'employees' }}
                deleteItem={deleteEmployee}
                dispatch={dispatch}
                sortBy={sortBy}
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
  error: state.employee.error
})

export default R.pipe(
  connect(mapStateToProps),
  isAdmin
)(EmployeeList)
