import { makeHeader } from '../requestHeader'
import request from 'request-promise'

export const FETCH_EMPLOYEES_BEGIN = 'FETCH_EMPLOYEES_BEGIN'
export const FETCH_EMPLOYEES_SUCCESS = 'FETCH_EMPLOYEES_SUCCESS'
export const FETCH_EMPLOYEES_ERROR = 'FETCH_EMPLOYEES_ERROR'

export const tableHeader = () => ([
  { 'fieldName': 'id', 'viewTitle': 'ID' },
  { 'fieldName': 'name', 'viewTitle': 'Tên' },
  { 'fieldName': 'position', 'viewTitle': 'Vị trí' },
  { 'fieldName': 'phoneNumber', 'viewTitle': 'Số điện thoại' },
  { 'fieldName': 'gender', 'viewTitle': 'Giới tinh' }
])

export const fetchEmployeesBegin = () => ({
  type: FETCH_EMPLOYEES_BEGIN
})

export const fetchEmployeesSuccess = products => ({
  type: FETCH_EMPLOYEES_SUCCESS,
  payload: { products }
})

export const fetchEmployeesError = error => ({
  type: FETCH_EMPLOYEES_ERROR,
  payload: { error }
})

export function fetchEmployees() {
  const options = {
    method: 'POST',
    uri: 'http://localhost:8000/v1/employees',
    body: { },
    headers: makeHeader(),
    json: true
  }

  return dispatch => {
    dispatch(fetchEmployeesBegin())
    request(options).then(body => dispatch(fetchEmployeesSuccess(body.data)))
    .catch(err => dispatch(fetchEmployeesError(err)))
  }
}
