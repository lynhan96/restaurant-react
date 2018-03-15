import React from 'react'
import R from 'ramda'
import ReactQueryParams from 'react-query-params'
import 'datatables.net'
import 'datatables.net-bs/js/dataTables.bootstrap'
import 'datatables.net-bs/css/dataTables.bootstrap.css'
import { connect } from 'react-redux'

import { isAdmin } from 'components/wrappers/isAdmin'
import TableEditItem from 'components/admin/table/TableEditItem'
import ErrorMessage from 'components/ErrorMessage'
import { viewLabelHeader } from '../../../lib/actions/employee'

class EmployeeList extends ReactQueryParams {
  render() {
    const { error, loading, employees } = this.props
    const params = this.queryParams

    if (error) {
      return (
        <div className='card'>
          <div style={style.loadingWrapper}>
            <i className='fa fa-warning' style={style.loadingIcon} />
            <p style={style.loadingText}>Quá trình tải dữ liệu xảy ra lỗi ...</p>
          </div>
        </div>
      )
    }

    if (loading) {
      return (
        <div className='card'>
          <div style={style.loadingWrapper}>
            <i className='fa fa-spinner fa-spin' style={style.loadingIcon} />
            <p style={style.loadingText}>Đang tải dữ liệu ...</p>
          </div>
        </div>
      )
    }

    return (
      <div className='content'>
        <div className='container-fluid'>
          {error && <ErrorMessage text={error} />}
          <TableEditItem
            editLabelHeader={viewLabelHeader()}
            editHeader='Chỉnh sửa thông tin Nhân viên'
            arrLink={{ list: 'employees', view: 'employee-view' }}
            data={employees[params.index]}
            subHeader={employees[params.index].name}
            indexData={params.index}
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
)(EmployeeList)

const style = {
  loadingWrapper: {
    textAlign: 'center',
    margin: '30px'
  },
  loadingIcon: {
    fontSize: '30px'
  },
  loadingText: {
    fontSize: '17px',
    marginTop: '10px'
  }
}
