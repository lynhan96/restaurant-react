import {
  FETCH_ABOUT_US_BEGIN,
  FETCH_ABOUT_US_SUCCESS,
  FETCH_ABOUT_US_ERROR
} from '../lib/actions/aboutUs'

import { ADMIN_SIGNED_OUT } from 'ducks/admin'

const initialState = {
  items: [{id: 0, imageUrl: {}, description: ''}],
  loading: false,
  error: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ABOUT_US_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_ABOUT_US_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.items
      }

    case FETCH_ABOUT_US_ERROR:
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
