import R from 'ramda'
import { ADMIN_SIGNED_OUT } from 'ducks/admin'
import { database } from 'database/database'

// Actions
const FETCH_QUESTIONS_PENDING = 'questions/FETCH_QUESTIONS_PENDING'
const FETCH_QUESTIONS_REJECTED = 'questions/FETCH_QUESTIONS_REJECTED'
const FETCH_QUESTIONS_RESOLVED = 'questions/FETCH_QUESTIONS_RESOLVED'
const QUESTION_ADDED = 'questions/QUESTION_ADDED'
const QUESTION_CHANGED = 'questions/QUESTION_CHANGED'
const QUESTION_REMOVED = 'questions/QUESTION_REMOVED'

// Creators
export const fetchQuestions = () => (dispatch) => {
  const ref = database.ref('questions')
  dispatch({ type: FETCH_QUESTIONS_PENDING })

  ref.once('value')
    .then((snapshot) => {
      const questions = snapshot.val()
      dispatch({ type: FETCH_QUESTIONS_RESOLVED, data: questions })
    })
    .then(() => {
      // attach listeners to data changes
      // a question does not have the id due to schema validation rules
      ref.on('child_added', (question) => dispatch({ type: QUESTION_ADDED, data: R.assoc('id', question.key, question.val()) }))
      ref.on('child_changed', (question) => dispatch({ type: QUESTION_CHANGED, data: R.assoc('id', question.key, question.val()) }))
      ref.on('child_removed', (question) => dispatch({ type: QUESTION_REMOVED, data: R.assoc('id', question.key, question.val()) }))
    })
    .catch((error) => dispatch({ type: FETCH_QUESTIONS_REJECTED, error: error.message }))
}

// Reducer
const defaultState = {
  loading: false,
  data: null,
  error: null
}

const reducer = (state = defaultState, action) => {
  const { type, data, error } = action

  switch (type) {
    case FETCH_QUESTIONS_PENDING:
      return {
        ...state,
        loading: true
      }
    case FETCH_QUESTIONS_REJECTED:
      return {
        ...state,
        loading: false,
        error
      }
    case FETCH_QUESTIONS_RESOLVED:
      return {
        ...state,
        loading: false,
        error: null,
        data
      }
    case QUESTION_ADDED:
    case QUESTION_CHANGED: {
      const { id } = data
      delete data.id

      return {
        ...state,
        data: {
          ...state.data,
          [id]: data
        }
      }
    }
    case QUESTION_REMOVED: {
      const { id } = data
      delete data.id

      return {
        ...state,
        data: R.dissoc(id, state.data)
      }
    }
    case ADMIN_SIGNED_OUT:
      return {...defaultState}
    default:
      return state
  }
}

export default reducer
