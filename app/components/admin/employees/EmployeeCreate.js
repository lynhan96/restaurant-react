import React from 'react'
import R from 'ramda'
import ReactQueryParams from 'react-query-params'

import { isAdmin } from 'components/wrappers/isAdmin'
import { editFieldInfo } from '../../../lib/actions/employee'
import { createEmployee } from 'lib/actions/employee'
import TableCreateItem from 'components/admin/table/TableCreateItem'

class EmployeeCreate extends ReactQueryParams {
  render() {
    return (
      <div className='content'>
        <div className='container-fluid'>
          <TableCreateItem
            editFieldInfo={editFieldInfo()}
            editHeader='Thêm nhân viên'
            subHeader=''
            submitCreate={createEmployee}
            arrLink={{ list: 'employees' }}
          />
        </div>
      </div>
    )
  }
}

export default R.pipe(
  isAdmin
)(EmployeeCreate)
