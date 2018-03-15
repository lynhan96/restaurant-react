import React, { Component } from 'react'
import R from 'ramda'

import 'datatables.net'
import 'datatables.net-bs/js/dataTables.bootstrap'
import 'datatables.net-bs/css/dataTables.bootstrap.css'
import { connect } from 'react-redux'

import { isAdmin } from 'components/wrappers/isAdmin'
import { tableHeader, fetchEmployees } from '../../../lib/actions/employee'
import TableListing from 'components/admin/table/TableListing'
import TableViewItem from 'components/admin/table/TableViewItem'

class EmployeeList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchEmployees())
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    const { error, loading, employees, params } = this.props

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

    if (params.action && params.action === 'view') {
      return (
        <TableViewItem
          viewHeader='Thông tin Nhân viên'
          data={employees[params.index]}
          subHeader={employees[params.index].name}
        />
      )
    }

    return (
      <TableListing
        datas={employees}
        tableHeader={tableHeader()}
        actionLink='/employees'
        viewHeader='Danh sách Nhân viên'
      />
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
