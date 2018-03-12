import R from 'ramda'

// Actions
const HOMEPAGE_CHANGE_TOGGLE = 'homepage/CHANGE_TOGGLE'

// Creators
export const changeToggleStatus = (toggleStatus, index) => (dispatch) => {
  const newStatus = R.update(index, !toggleStatus[index], toggleStatus)
  dispatch({ type: HOMEPAGE_CHANGE_TOGGLE, toggleStatus: newStatus })
}

// Reducer
const defaultState = {
  toggleStatus: [false, false, false]
}

const reducer = (state = defaultState, action) => {
  const { type, toggleStatus } = action

  switch (type) {
    case HOMEPAGE_CHANGE_TOGGLE:
      return {
        ...state,
        toggleStatus
      }
    default:
      return state
  }
}

export default reducer
