import React from 'react'
import R from 'ramda'
import ReactQueryParams from 'react-query-params'

import { connect } from 'react-redux'

import { isAdmin } from 'components/wrappers/isAdmin'
import { tableHeader, fetchEmployees, deleteEmployee, sortByKey, searchByKeyword, searchFieldList } from '../../../lib/actions/employee'
import TableListing from 'components/admin/table/TableListing'
import { updateActiveLink } from 'ducks/admin'

class EmployeeList extends ReactQueryParams {
  componentDidMount() {
    this.props.dispatch(fetchEmployees())
    this.props.dispatch(updateActiveLink('employees'))
  }

  render() {
    const { sortType, sortBy, error, loading, employees, dispatch } = this.props

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
                sortBy={sortByKey}
                sortFieldName={sortBy}
                sortType={sortType}
                searchFunc={searchByKeyword}
                searchFieldList={searchFieldList()}
                error={error}
                loading={loading}
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
  sortType: state.employee.sortType
})

export default R.pipe(
  connect(mapStateToProps),
  isAdmin
)(EmployeeList)
