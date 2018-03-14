import React from 'react'
import R from 'ramda'
import { Link } from 'react-router'

import { isAdmin } from 'components/wrappers/isAdmin'

const Dashboard = (props) => {
  return (
    <div className='content'>
    </div>
  )
}

export default R.pipe(
  isAdmin
)(Dashboard)
