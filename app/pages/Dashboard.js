import React from 'react'
import R from 'ramda'
import { isAdmin } from 'components/wrappers/isAdmin'

const Dashboard = (props) => {
  return (
    <div className='row'>
      <div className='col-md-12'>
        <h1>Dashboard</h1>
      </div>
    </div>
  )
}

export default R.pipe(
  isAdmin
)(Dashboard)
