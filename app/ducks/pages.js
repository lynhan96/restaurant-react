import R from 'ramda'
import { database } from 'database/database'

// Actions
const FETCH_PAGES_PENDING = 'pages/FETCH_PAGES_PENDING'
const FETCH_PAGES_REJECTED = 'pages/FETCH_PAGES_REJECTED'
const FETCH_PAGES_RESOLVED = 'pages/FETCH_PAGES_RESOLVED'
const PAGE_CHANGED = 'pages/PAGE_CHANGED'

// Creators
export const fetchPages = () => (dispatch) => {
  const ref = database.ref(`/pages`)
  dispatch({ type: FETCH_PAGES_PENDING })

  ref.once('value')
    .then((snapshot) => {
      const pages = snapshot.val()
      dispatch({ type: FETCH_PAGES_RESOLVED, data: pages })
    })
    .then(() => {
      // attach listeners to data changes
      ref.on('child_changed', (result) => dispatch({ type: PAGE_CHANGED, data: R.assoc('id', result.key, result.val()) }))
    })
    .catch((error) => dispatch({ type: FETCH_PAGES_REJECTED, error: error.message }))
}

// Reducer
const defaultState = {
  loading: false,
  data: {},
  error: null
}

const reducer = (state = defaultState, action) => {
  const { type, data, error } = action

  switch (type) {
    case FETCH_PAGES_PENDING:
      return {
        ...state,
        loading: true
      }
    case FETCH_PAGES_REJECTED:
      return {
        ...state,
        loading: false,
        error
      }
    case FETCH_PAGES_RESOLVED:
      return {
        ...state,
        loading: false,
        error: null,
        data
      }
    case PAGE_CHANGED: {
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
    default:
      return state
  }
}

export default reducer
