const ADMIN_SIGNED_IN = 'admin/ADMIN_SIGNED_IN'
export const ADMIN_SIGNED_OUT = 'admin/ADMIN_SIGNED_OUT'

export const dispatchLogout = (dispatch) => () => {
  if (confirm('Bạn có muốn rời khỏi trang Quản lý?')) {
    dispatch(adminHasSignedOut())
  }
}

// Creators
export const adminHasSignedOut = () => (dispatch) => {
  dispatch({ type: ADMIN_SIGNED_OUT })
}

export const adminHasSignedIn = (admin) => (dispatch) => {
  dispatch({ type: ADMIN_SIGNED_IN, data: admin })
}

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
