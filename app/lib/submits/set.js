import R from 'ramda'
import { SubmissionError } from 'redux-form'

import { database } from 'database/database'

export const submitSet =
  (values, dispatch, props) => {
    const { setID } = props
    // whitelist values
    const params = R.pipe(
      R.pick(['id', 'title', 'overview', 'category', 'published', 'ordering']),
      R.evolve({
        published: R.equals('true'), // published is a string of "true"/"false"
        ordering: parseInt
      })
    )(values)

    return database.ref(`/sets/${setID}`).update(params)
      .catch((error) => {
        const { message } = error
        throw new SubmissionError({ _error: message })
      })
  }
