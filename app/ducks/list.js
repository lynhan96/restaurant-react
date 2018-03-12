import R from 'ramda'

import { database } from 'database/database'

const FETCH_LIST_PENDING = 'list/FETCH_LIST_PENDING'
const FETCH_LIST_REJECTED = 'list/FETCH_LIST_REJECTED'
const FETCH_LIST_RESOLVED = 'list/FETCH_LIST_RESOLVED'

// TODO: Refactor this to use the same ducks/sets & ducks/questions + listen to changes
// Right now, if admin removes a question while a user is taking the test, it will violate the firebase security rules
export const fetchSets = () => (dispatch) => {
  dispatch({ type: FETCH_LIST_PENDING })
  return database.ref('sets').orderByChild('published').equalTo(true).once('value')
    .then((snapshot) => {
      const sets = snapshot.val()
      const setIds = R.keys(sets)
      return fetchQuestions(sets, setIds)
    })
    .then((data) => dispatch({ type: FETCH_LIST_RESOLVED, data: data }))
    .catch((error) => dispatch({ type: FETCH_LIST_REJECTED, error: error.message }))
}

const fetchQuestions = (sets, setIds) => {
  if (setIds.length > 0) {
    const setId = R.head(setIds)
    return new Promise((resolve) => {
      database.ref('questions/' + setId).orderByChild('ordering').once('value')
      .then((snapshot) => {
        sets[setId]['questions'] = snapshot.val()
        return resolve(fetchQuestions(sets, R.tail(setIds)))
      })
      .catch(() => sets)
    })
  } else {
    return sets
  }
}

const defaultState = {
  loading: false,
  data: null,
  error: null
}

const reducer = (state = defaultState, action) => {
  const { type, data, error } = action

  switch (type) {
    case FETCH_LIST_PENDING:
      return {
        ...state,
        loading: true
      }
    case FETCH_LIST_REJECTED:
      return {
        ...state,
        loading: false,
        error
      }
    case FETCH_LIST_RESOLVED:
      return {
        ...state,
        data: {
          ...state.data,
          setData: data
        }
      }
    default:
      return state
  }
}

export default reducer
