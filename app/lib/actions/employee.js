import request from 'request-promise'
import { SubmissionError } from 'redux-form'
import R from 'ramda'

import { makeRequestOptions } from '../requestHeader'
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

export const viewLabelHeader = () => ([
  { 'fieldName': 'name', 'viewTitle': 'Tên' },
  { 'fieldName': 'position', 'viewTitle': 'Vị trí' },
  { 'fieldName': 'phoneNumber', 'viewTitle': 'Số điện thoại' },
  { 'fieldName': 'birthday', 'viewTitle': 'Ngày sinh' },
  { 'fieldName': 'gender', 'viewTitle': 'Giới tinh' },
  { 'fieldName': 'createdAt', 'viewTitle': 'Ngày tạo dữ liệu' }
])

export const editLabelHeader = () => ([
  { 'fieldName': 'name', 'viewTitle': 'Tên' },
  { 'fieldName': 'position', 'viewTitle': 'Vị trí' },
  { 'fieldName': 'phoneNumber', 'viewTitle': 'Số điện thoại' },
  { 'fieldName': 'birthday', 'viewTitle': 'Ngày sinh' },
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

export const fetchEmployees = _ => {
  return dispatch => {
    dispatch(fetchEmployeesBegin())
    request(makeRequestOptions({}, 'employees')).then(body => dispatch(fetchEmployeesSuccess(body.data)))
    .catch(err => dispatch(fetchEmployeesError(err)))
  }
}

export const editEmployee =
  (values, dispatch, props) => {
    const url = 'updateEmployee'
    const params = R.merge({ employeeId: props.data.id })(values)

    return request(makeRequestOptions(params, url)).then(body => {
      console.log(body)
      if (body.code === 0) {
        return Promise.resolve()
      } else if (body.code === 417) {
        throw new SubmissionError({ _error: 'Dữ liệu không tồn tại' })
      } else {
        throw new SubmissionError({ _error: 'Quá trình cập nhập dữ liệu xảy ra lỗi' })
      }
    })
    .catch(function (err) {
      if (err.errors && err.errors._error) {
        throw new SubmissionError({ _error: err.errors._error })
      } else {
        throw new SubmissionError({ _error: err.message })
      }
    })
  }
