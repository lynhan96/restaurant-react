import { SubmissionError } from 'redux-form'
import Navigator from 'lib/Navigator'
import R from 'ramda'

import { database } from 'database/database'

export const submitListQuestion = (values, dispatch, props) => {
  const { user, set } = props
  const { uid } = user
  const { id: setID } = set
  const updatedValues = R.dissoc('questionIndex', values)

  return database.ref(`/results/${uid}/${setID}`).update(updatedValues)
    .catch((error) => {
      const { message } = error
      throw new SubmissionError({ _error: message })
    })
}

export const submitListQuestionSuccess = (successResponse, dispatch, props) => {
  const { set } = props
  const { id: setID } = set
  Navigator.push(`list-result/${setID}`)
}
