import R from 'ramda'

import { USER_SIGNED_OUT } from 'ducks/user'
import { ADMIN_SIGNED_OUT } from 'ducks/admin'
import { database } from 'database/database'
import { getScore } from 'lib/helpers'

// Actions
const FETCH_RESULTS_PENDING = 'results/FETCH_RESULTS_PENDING'
const FETCH_RESULTS_REJECTED = 'results/FETCH_RESULTS_REJECTED'
const FETCH_RESULTS_RESOLVED = 'results/FETCH_RESULTS_RESOLVED'
const RESULT_ADDED = 'results/RESULT_ADDED'
const RESULT_CHANGED = 'results/RESULT_CHANGED'
const RESULT_REMOVED = 'results/RESULT_REMOVED'
const SEND_TO_ADMIN_PENDING = 'results/SEND_TO_ADMIN_PENDING'
const SEND_TO_ADMIN_REJECTED = 'results/SEND_TO_ADMIN_REJECTED'
const SEND_TO_ADMIN_SUCCESS = 'results/SEND_TO_ADMIN_SUCCESS'

// Creators
export const fetchAllResults = () => (dispatch) => {
  const ref = database.ref(`/results`)
  dispatch({ type: FETCH_RESULTS_PENDING })

  ref.once('value')
    .then((snapshot) => {
      const results = snapshot.val()
      dispatch({ type: FETCH_RESULTS_RESOLVED, data: results })
    })
    .then(() => {
      // attach listeners to data changes
      ref.on('child_added', (result) => dispatch({ type: RESULT_ADDED, data: R.assoc('id', result.key, result.val()) }))
      ref.on('child_changed', (result) => dispatch({ type: RESULT_CHANGED, data: R.assoc('id', result.key, result.val()) }))
      ref.on('child_removed', (result) => dispatch({ type: RESULT_REMOVED, data: R.assoc('id', result.key, result.val()) }))
    })
    .catch((error) => dispatch({ type: FETCH_RESULTS_REJECTED, error: error.message }))
}

export const fetchResults = () => (dispatch, getState) => {
  const uid = R.path(['user', 'data', 'uid'], getState())
  const ref = database.ref(`/results/${uid}`)
  dispatch({ type: FETCH_RESULTS_PENDING })

  ref.once('value')
    .then((snapshot) => {
      const results = snapshot.val()
      dispatch({ type: FETCH_RESULTS_RESOLVED, data: results })
    })
    .then(() => {
      // attach listeners to data changes
      ref.on('child_added', (result) => dispatch({ type: RESULT_ADDED, data: R.assoc('id', result.key, result.val()) }))
      ref.on('child_changed', (result) => dispatch({ type: RESULT_CHANGED, data: R.assoc('id', result.key, result.val()) }))
      ref.on('child_removed', (result) => dispatch({ type: RESULT_REMOVED, data: R.assoc('id', result.key, result.val()) }))
    })
    .catch((error) => dispatch({ type: FETCH_RESULTS_REJECTED, error: error.message }))
}

export const sendResultToAdminEmail = (setID) => (dispatch, getState) => {
  const states = getState()
  const user = R.path(['form', 'apply', 'values'], states)
  const { questions, category, title } = R.pipe(
    R.path(['list', 'data', 'setData']),
    R.prop(setID),
    R.pick(['questions', 'category', 'title'])
  )(states)
  const result = R.pipe(
    R.path(['results', 'data']),
    R.prop(setID)
  )(states)

  const percentage = parseInt(getScore(questions, result))
  const body = JSON.stringify({
    categoryName: category,
    setName: title,
    result: percentage,
    userInfo: user
  })

  dispatch({ type: SEND_TO_ADMIN_PENDING })

  fetch(API_SCFP_SEND_ADMIN_EMAIL, {
    method: 'POST',
    body: body
  }).then((response) => {
    const { status } = response
    if (status === 200) {
      dispatch({ type: SEND_TO_ADMIN_SUCCESS })
    } else {
      dispatch({ type: SEND_TO_ADMIN_REJECTED, error: 'Cannot send email! Please retry!' })
    }
  }).catch((error) => {
    const { message } = error
    dispatch({ type: SEND_TO_ADMIN_REJECTED, error: message })
  })
}

// Reducer
const defaultState = {
  loading: false,
  data: null,
  error: null,
  mailToAdmin: false
}

const reducer = (state = defaultState, action) => {
  const { type, data, error } = action

  switch (type) {
    case SEND_TO_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        mailToAdmin: true
      }
    case SEND_TO_ADMIN_REJECTED:
      return {
        ...state,
        loading: false,
        mailToAdmin: false,
        error: error
      }
    case SEND_TO_ADMIN_PENDING:
      return {
        ...state,
        loading: true,
        mailToAdmin: false,
        error: null
      }
    case FETCH_RESULTS_PENDING:
      return {
        ...state,
        loading: true,
        error: null
      }
    case FETCH_RESULTS_REJECTED:
      return {
        ...state,
        loading: false,
        error
      }
    case FETCH_RESULTS_RESOLVED:
      return {
        ...state,
        loading: false,
        error: null,
        data
      }
    case RESULT_ADDED:
    case RESULT_CHANGED: {
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
    case RESULT_REMOVED: {
      const { id } = data
      delete data.id

      return {
        ...state,
        data: R.dissoc(id, state.data)
      }
    }
    case ADMIN_SIGNED_OUT:
    case USER_SIGNED_OUT:
      return {...defaultState}
    default:
      return state
  }
}

export default reducer

export const resetMailToAdminStatus = () => {
  return { type: SEND_TO_ADMIN_REJECTED, error: null }
}
