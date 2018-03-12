import R from 'ramda'
import { SubmissionError } from 'redux-form'

import { database } from 'database/database'

export const submitQuestion =
  (values, dispatch, props) => {
    const { setID, questionID } = props
    // whitelist values
    const params = R.pipe(
      R.pick(['id', 'title', 'definition', 'ordering', 'responses']),
      R.evolve({
        published: R.equals('true'), // published is a string of "true"/"false"
        ordering: parseInt,
        responses: R.pipe(
          R.map((response) => ({ [response.id]: response })),
          R.mergeAll,
          R.map(R.evolve({weightage: parseInt}))
        )
      })
    )(values)

    return database.ref(`/questions/${setID}/${questionID}`).update(params)
      .catch((error) => {
        const { message } = error
        throw new SubmissionError({ _error: message })
      })
  }
