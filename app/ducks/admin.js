const ADMIN_SIGNED_IN = 'admin/ADMIN_SIGNED_IN'
const UPDATE_ACTIVE_LINK = 'admin/UPDATE_ACTIVE_LINK'
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

export const updateActiveLink = (link) => (dispatch) => {
  dispatch({ type: UPDATE_ACTIVE_LINK, activeLink: link })
}

// Reducer
const defaultState = {
  signedIn: false,
  activeLink: null,
  data: null
}

const reducer = (state = defaultState, action) => {
  const { type, data, activeLink } = action

  switch (type) {
    case ADMIN_SIGNED_IN:
      return {
        ...state,
        signedIn: true,
        data
      }
    case UPDATE_ACTIVE_LINK:
      return {
        ...state,
        signedIn: true,
        activeLink: activeLink
      }
    case ADMIN_SIGNED_OUT:
      return {...defaultState}
    default:
      return state
  }
}

export default reducer
