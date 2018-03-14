import React, { Component } from 'react'
import R from 'ramda'
import { Link } from 'react-router'
import $ from 'jquery'
import 'datatables.net'
import 'datatables.net-bs/js/dataTables.bootstrap'
import 'datatables.net-bs/css/dataTables.bootstrap.css'
import { connect } from 'react-redux'

import { isAdmin } from 'components/wrappers/isAdmin'
import { tableHeader, fetchEmployees } from '../../../lib/actions/employee'

class EmployeeList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchEmployees())
  }

  render() {
    const { error, loading, employees } = this.props
    const header = tableHeader()

    if (error) {
      return <div>Error! {error.message}</div>
    }

    if (loading) {
      return <div>Loading...</div>
    } else {
      $('#table').DataTable()
    }

    return (
      <div className='row' style={{ 'margin': '0' }}>
        <div className='box'>
          <div className='box-header' style={{ 'textAlign': 'center' }}>
            <h3 className='box-title' style={{ 'fontSize': '30px' }}>Bảng Nhân viên</h3>
          </div>
            <div className='box-body'>
              <table id='table' className='table table-bordered table-striped'>
                <thead>
                  <tr>
                    {header.map((item, index) => <th key={index}>{ item.viewTitle }</th>)}
                  </tr>
                </thead>
                <tbody>
                  {employees.map(function(item, itemIndex) {
                    return (
                      <tr key={itemIndex}>
                        {header.map(function(headerItem, headerIndex) {
                          return <td key={headerIndex}>{item[headerItem.fieldName]}</td>
                        })}
                        <td>
                          <Link to='#' className='btn btn-primary btn-block btn-flat' style={{ width: '30%', display: 'inline-block' }}>
                            Chi tiết
                          </Link>
                          <Link to='#' className='btn btn-danger btn-block btn-flat' style={{ width: '30%', display: 'inline-block', margin: '0 10px' }}>
                            Xóa
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
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
