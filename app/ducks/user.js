import { firebaseAuth } from 'database/database'
import { fetchResults } from 'ducks/results'
import { fetchSets } from 'ducks/list'

// Actions
const USER_SIGNED_IN = 'user/USER_SIGNED_IN'
export const USER_SIGNED_OUT = 'user/USER_SIGNED_OUT'

// Creators
export const userHasSignedOut = () => ({ type: USER_SIGNED_OUT })

export const userHasSignedIn = (user) => (dispatch) => {
  dispatch({ type: USER_SIGNED_IN, data: user })

  // initialise user state
  dispatch(fetchResults())
  dispatch(fetchSets())
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
    case USER_SIGNED_IN:
      return {
        ...state,
        signedIn: true,
        data
      }
    case USER_SIGNED_OUT:
      return {...defaultState}
    default:
      return state
  }
}

export default reducer
