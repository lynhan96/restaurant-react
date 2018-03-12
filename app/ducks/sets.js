import R from 'ramda'
import { ADMIN_SIGNED_OUT } from 'ducks/admin'
import { database } from 'database/database'

// Actions
const FETCH_SETS_PENDING = 'sets/FETCH_SETS_PENDING'
const FETCH_SETS_REJECTED = 'sets/FETCH_SETS_REJECTED'
const FETCH_SETS_RESOLVED = 'sets/FETCH_SETS_RESOLVED'
const SET_ADDED = 'sets/SET_ADDED'
const SET_CHANGED = 'sets/SET_CHANGED'
const SET_REMOVED = 'sets/SET_REMOVED'

// Creators
export const fetchSets = () => (dispatch) => {
  const ref = database.ref('sets')
  dispatch({ type: FETCH_SETS_PENDING })

  ref.once('value')
    .then((snapshot) => {
      const sets = snapshot.val()
      dispatch({ type: FETCH_SETS_RESOLVED, data: sets })
    })
    .then(() => {
      // attach listeners to data changes
      ref.on('child_added', (set) => dispatch({ type: SET_ADDED, data: set.val() }))
      ref.on('child_changed', (set) => dispatch({ type: SET_CHANGED, data: set.val() }))
      ref.on('child_removed', (set) => dispatch({ type: SET_REMOVED, data: set.val() }))
    })
    .catch((error) => dispatch({ type: FETCH_SETS_REJECTED, error: error.message }))
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
    case FETCH_SETS_PENDING:
      return {
        ...state,
        loading: true
      }
    case FETCH_SETS_REJECTED:
      return {
        ...state,
        loading: false,
        error
      }
    case FETCH_SETS_RESOLVED:
      return {
        ...state,
        loading: false,
        error: null,
        data
      }
    case SET_ADDED:
    case SET_CHANGED: {
      const { id } = data
      return {
        ...state,
        data: {
          ...state.data,
          [id]: data
        }
      }
    }
    case SET_REMOVED: {
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
