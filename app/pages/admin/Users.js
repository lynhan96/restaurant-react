import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import Spinner from 'react-spinkit'

import { isAdmin } from 'components/wrappers/isAdmin'
import UsersList from 'components/admin/UsersList'
import ErrorMessage from 'components/ErrorMessage'
import { getScore } from 'lib/helpers'

// Flatten the questions data from state
// into one single array of questions
const flattenedQuestions = R.pipe(
  R.values,
  R.map(R.values),
  R.flatten,
)

// TODO: To show multiple results for user who has taken multiple sets
const getResultFromUser = (results, userID) =>
  R.head(R.values(results[userID]))

// TODO: A lot of kungfu here in order to get the results for each user. See if we can refactor it.
const Users = (props) => {
  const { error, users: data, questionsData, resultsData } = props
  const questions = flattenedQuestions(questionsData)
  const calculateScore = (userID) =>
    getScore(questions, getResultFromUser(resultsData, userID))
  const users = R.pipe(
    R.values,
    R.map((user) => ({...user, score: calculateScore(user.id)}))
  )(data || {})
  const hasUsersData = !R.isEmpty(users)

  return (
    <div className='row'>
      <div className='col-md-12'>
        <h1>Users</h1>
        {error && <ErrorMessage text={error} />}
        {hasUsersData && <UsersList users={users} />}
        {!hasUsersData && <Spinner spinnerName='double-bounce' noFadeIn /> }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  error: R.path(['users', 'error'], state),
  users: R.path(['users', 'data'], state),
  questionsData: R.path(['questions', 'data'], state),
  resultsData: R.path(['results', 'data'], state)
})

export default R.pipe(
  connect(mapStateToProps),
  isAdmin
)(Users)
