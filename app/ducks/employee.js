import {
  FETCH_EMPLOYEES_BEGIN,
  FETCH_EMPLOYEES_SUCCESS,
  FETCH_EMPLOYEES_ERROR,
  FETCH_EMPLOYEES_SORT_VALUE
} from '../lib/actions/employee'

import { ADMIN_SIGNED_OUT } from 'ducks/admin'

const initialState = {
  items: [],
  loading: false,
  error: null,
  sortBy: 'id',
  sortType: 'AtoZ'
}

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_EMPLOYEES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_EMPLOYEES_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.employees
      }

    case FETCH_EMPLOYEES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        items: []
      }

    case FETCH_EMPLOYEES_SORT_VALUE:
      return {
        ...state,
        sortBy: action.sortBy,
        sortType: action.sortType
      }

    case ADMIN_SIGNED_OUT:
      return {...initialState}
    default:
      return state
  }
}
