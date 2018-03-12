import R from 'ramda'

import { ADMIN_SIGNED_OUT } from 'ducks/admin'
import { database } from 'database/database'

// Actions
const FETCH_USERS_PENDING = 'users/FETCH_USERS_PENDING'
const FETCH_USERS_REJECTED = 'users/FETCH_USERS_REJECTED'
const FETCH_USERS_RESOLVED = 'users/FETCH_USERS_RESOLVED'
const USER_ADDED = 'users/USER_ADDED'
const USER_CHANGED = 'users/USER_CHANGED'
const USER_REMOVED = 'users/USER_REMOVED'

// Creators
export const fetchUsers = () => (dispatch) => {
  const ref = database.ref('users')
  dispatch({ type: FETCH_USERS_PENDING })

  ref.once('value')
    .then((snapshot) => {
      const users = snapshot.val()
      dispatch({ type: FETCH_USERS_RESOLVED, data: users })
      return Promise.resolve()
    })
    .then(() => {
      // attach listeners to data changes
      ref.on('child_added', (user) => dispatch({ type: USER_ADDED, data: user.val() }))
      ref.on('child_changed', (user) => dispatch({ type: USER_CHANGED, data: user.val() }))
      ref.on('child_removed', (user) => dispatch({ type: USER_REMOVED, data: user.val() }))
    })
    .catch((error) => dispatch({ type: FETCH_USERS_REJECTED, error: error.message }))
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
    case FETCH_USERS_PENDING:
      return {
        ...state,
        loading: true
      }
    case FETCH_USERS_REJECTED:
      return {
        ...state,
        loading: false,
        error
      }
    case FETCH_USERS_RESOLVED:
      return {
        ...state,
        loading: false,
        error: null,
        data
      }
    case USER_ADDED:
    case USER_CHANGED: {
      const { id } = data
      return {
        ...state,
        data: {
          ...state.data,
          [id]: data
        }
      }
    }
    case USER_REMOVED: {
      const { id } = data

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
