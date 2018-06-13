import {
    FETCH_DASHBOARD_BEGIN,
    FETCH_DASHBOARD_SUCCESS,
    FETCH_DASHBOARD_ERROR,
    FETCH_DASHBOARD_SORT_VALUE,
    FETCH_DASHBOARD_TOTAL_PAGE
  } from '../lib/actions/dashboard'
  
import { ADMIN_SIGNED_OUT } from 'ducks/admin'

const initialState = {
  items: [],
  loading: false,
  error: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DASHBOARD_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_DASHBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.dashboard
      }

    case FETCH_DASHBOARD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        items: []
      }

    case ADMIN_SIGNED_OUT:
      return {...initialState}
    default:
      return state
  }
}

export default reducer
  