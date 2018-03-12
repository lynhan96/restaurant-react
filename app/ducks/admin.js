import { firebaseAuth } from 'database/database'
import { fetchUsers } from 'ducks/users'
import { fetchSets } from 'ducks/sets'
import { fetchQuestions } from 'ducks/questions'
import { fetchAllResults } from 'ducks/results'

// Actions
const ADMIN_SIGNED_IN = 'admin/ADMIN_SIGNED_IN'
export const ADMIN_SIGNED_OUT = 'admin/ADMIN_SIGNED_OUT'

// Creators
export const adminHasSignedOut = () => ({ type: ADMIN_SIGNED_OUT })

export const adminHasSignedIn = (admin) => (dispatch) => {
  dispatch({ type: ADMIN_SIGNED_IN, data: admin })

  // initialise state for admin
  dispatch(fetchUsers())
  dispatch(fetchSets())
  dispatch(fetchQuestions())
  dispatch(fetchAllResults())
}

export const requestLogout = () => (dispatch) => firebaseAuth.signOut()

// Reducer
const defaultState = {
  signedIn: false,
  data: null
}

const reducer = (state = defaultState, action) => {
  const { type, data } = action

  switch (type) {
    case ADMIN_SIGNED_IN:
      return {
        ...state,
        signedIn: true,
        data
      }
    case ADMIN_SIGNED_OUT:
      return {...defaultState}
    default:
      return state
  }
}

export default reducer
