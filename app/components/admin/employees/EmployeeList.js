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
    // $('#table').DataTable()
  }

  render() {
    const { error, loading, employees } = this.props
    const header = tableHeader()
    console.log(employees)
    console.log(header)

    if (error) {
      return <div>Error! {error.message}</div>
    }

    if (loading) {
      return <div>Loading...</div>
    }

    return (
      <div className='row'>
        <div className='box'>
          <div className='box-header' style={{ 'textAlign': 'center' }}>
            <h3 className='box-title' style={{ 'fontSize': '30px' }}>Bảng Nhân viên</h3>
          </div>
            <div className='box-body'>
              <table id='table' className='table table-bordered table-striped'>
                <thead>
                  {
                    Object.keys(header).forEach(function (key) {
                        var value = obj[key]
                        <tr>{value}</tr>
                    })
                    $.each(header, (key, value) => )
                  }
                </thead>
                <tbody>

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
