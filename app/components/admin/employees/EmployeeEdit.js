import React from 'react'
import R from 'ramda'
import ReactQueryParams from 'react-query-params'
import { connect } from 'react-redux'

import ErrorMessage from 'components/ErrorMessage'
import ContentLoading from 'components/ContentLoading'
import { isAdmin } from 'components/wrappers/isAdmin'
import { editLabelHeader } from '../../../lib/actions/employee'
import TableEditItem from 'components/admin/table/TableEditItem'
import { editEmployee } from 'lib/actions/employee'

class EmployeeEdit extends ReactQueryParams {
  render() {
    const { error, loading, employees } = this.props
    const params = this.queryParams

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
          {error && <ErrorMessage text={error} />}
          <TableEditItem
            editLabelHeader={editLabelHeader()}
            editHeader='Chỉnh sửa thông tin Nhân viên'
            arrLink={{ list: 'employees', view: 'employee-view' }}
            data={employees[params.index]}
            subHeader={employees[params.index].name}
            indexData={params.index}
            submitEdit={editEmployee}
          />
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
)(EmployeeEdit)
