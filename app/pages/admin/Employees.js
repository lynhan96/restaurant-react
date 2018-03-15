import React from 'react'
import R from 'ramda'
import ReactQueryParams from 'react-query-params'

import { isAdmin } from 'components/wrappers/isAdmin'
import EmployeeList from 'components/admin/employees/EmployeeList'
import ErrorMessage from 'components/ErrorMessage'
import { updateActiveLink } from 'ducks/admin'

class Employees extends ReactQueryParams {
  componentDidMount() {
    this.props.dispatch(updateActiveLink('employees'))
  }

  render() {
    const { error } = this.props

    return (
      <div className='content'>
        {error && <ErrorMessage text={error} />}
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-12'>
              <EmployeeList
                params={this.queryParams}
              />
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default R.pipe(
  isAdmin
)(Employees)
