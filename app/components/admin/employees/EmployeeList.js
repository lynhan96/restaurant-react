import React, { Component } from 'react'
import R from 'ramda'

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
      return (
        <div style={style.loadingWrapper}>
          <i className='fa fa-warning' style={style.loadingIcon} />
          <p style={style.loadingText}>Quá trình tải dữ liệu xảy ra lỗi ...</p>
        </div>
      )
    }

    if (loading) {
      return (
        <div style={style.loadingWrapper}>
          <i className='fa fa-spinner fa-spin' style={style.loadingIcon} />
          <p style={style.loadingText}>Đang tải dữ liệu ...</p>
        </div>
      )
    }

    return (
      <div className='card-content table-responsive'>
        <table className='table table-hover'>
          <thead className='text-primary'>
            <tr>
              {header.map((item, index) => <th key={index}>{ item.viewTitle }</th>)}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(function(item, itemIndex) {
              return (
                <tr key={itemIndex}>
                  {header.map(function(headerItem, headerIndex) {
                    return <td key={headerIndex}>{item[headerItem.fieldName]}</td>
                  })}
                  <td className='td-actions text-right'>
                    <button type='button' rel='tooltip' title='Chỉnh sửa dữ liệu' className='btn btn-primary btn-simple btn-xs'>
                      <i className='material-icons'>edit</i>
                    </button>
                    <button type='button' rel='tooltip' title='Xóa dữ liệu' className='btn btn-danger btn-simple btn-xs'>
                      <i className='material-icons'>close</i>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
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
