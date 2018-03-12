import React from 'react'
import R from 'ramda'
import Table from 'react-bootstrap/lib/Table'

const displayUserRow = (user) => {
  const { id, title, name, company, email, country, yearXP, score } = user
  const passed = score >= 75

  return (
    <tr key={id}>
      <td>{title} {name}</td>
      <td>{company}</td>
      <td>{email}</td>
      <td>{yearXP}</td>
      <td>{country}</td>
      <td style={passed ? styles.passed : styles.failed}>{score.toFixed(2)}%</td>
    </tr>
  )
}

const UsersList = (props) => {
  const { users } = props
  if (users == null) return null

  return (
    <div className='row'>
      <div className='col-md-12'>
        <Table bordered={true} condensed={true} hover={true}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Email</th>
              <th>Years of XP</th>
              <th>Country</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {R.values(users).map(displayUserRow)}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

const styles = {
  passed: {
    color: 'green'
  },
  failed: {
    color: 'red'
  }
}

export default UsersList
