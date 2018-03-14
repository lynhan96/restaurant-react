import React from 'react'
import R from 'ramda'

import { isAdmin } from 'components/wrappers/isAdmin'
import EmployeeList from 'components/admin/employees/EmployeeList'
import ErrorMessage from 'components/ErrorMessage'

const Employees = (props) => {
  const { error } = props

  return (
    <div className='content'>
      {error && <ErrorMessage text={error} />}
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-header' data-background-color='purple'>
                <h4 className='title'>Danh sách Nhân viên</h4>
              </div>
              <EmployeeList/>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default R.pipe(
  isAdmin
)(Employees)
