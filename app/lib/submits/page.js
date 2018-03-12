import R from 'ramda'
import { SubmissionError } from 'redux-form'

import { database } from 'database/database'

export const submitPage = (pageID) => (values, dispatch, props) => {
  // whitelist values
  const params = R.pick(['title', 'content'], values)

  return database.ref(`/pages/${pageID}`).update(params)
    .catch((error) => {
      const { message } = error
      throw new SubmissionError({ _error: message })
    })
}
