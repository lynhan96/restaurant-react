import React from 'react'
import R from 'ramda'

import { isAdmin } from 'components/wrappers/isAdmin'
import EmployeeList from 'components/admin/employees/EmployeeList'
import ErrorMessage from 'components/ErrorMessage'

const Employees = (props) => {
  const { error, resultsData } = props

  return (
    <div className='content-wrapper'>
      <section className='content'>
        {error && <ErrorMessage text={error} />}
        <EmployeeList
          data={resultsData}
        />
      </section>
    </div>
  )
}

export default R.pipe(
  isAdmin
)(Employees)
