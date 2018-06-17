import request from 'request-promise'
import async from 'async'
import { SubmissionError } from 'redux-form'
import * as firebase from 'firebase'
import R from 'ramda'
import { getAdminData } from 'lib/Constant'

import { showNotification } from './showNotification'
import { makeRequestOptions } from '../requestHeader'

export const FETCH_ABOUT_US_BEGIN = 'FETCH_ABOUT_US_BEGIN'
export const FETCH_ABOUT_US_SUCCESS = 'FETCH_ABOUT_US_SUCCESS'
export const FETCH_ABOUT_US_ERROR = 'FETCH_ABOUT_US_ERROR'

export const editFieldInfo = () => ([
  { 'fieldName': 'imageUrl', 'viewTitle': 'Hình ảnh', isRequired: true, type: 'image' },
  { 'fieldName': 'description', 'viewTitle': 'Mô tả', isRequired: true, type: 'ckeditor' }
])

export const selectFieldData = () => ({
})

export const customSelectFieldData = () => ({
})

export const fetchAboutUsBegin = () => ({
  type: FETCH_ABOUT_US_BEGIN
})

export const fetchAboutUsSuccess = items => ({
  type: FETCH_ABOUT_US_SUCCESS,
  items: items
})

export const fetchAboutUsError = error => ({
  type: FETCH_ABOUT_US_ERROR,
  error: error
})

export const fetchAboutUs = params => {
  return dispatch => {
    if (getAdminData() == null) {
      return
    }

    dispatch(fetchAboutUsBegin())
    request(makeRequestOptions(params, 'aboutUs')).then(body => {
      if (body.code === 401 || body.code === 400 || body.code === 414) {
        showNotification('topRight', 'error', 'Quá trình xác thực xảy ra lỗi!')
      } else {
        dispatch(fetchAboutUsSuccess(body.data.items))
      }
    })
    .catch(err => dispatch(fetchAboutUsError(err)))
  }
}

const updateEvent = (params, url, itemData, values, dispatch, props) => {
  return new Promise((resolve) => {
    request(makeRequestOptions(params, url)).then(body => {
      if (body.code === 0) {
        props.items[props.itemIndex] = R.merge(itemData)(values)
        dispatch(fetchAboutUsSuccess(props.items))

        showNotification('topRight', 'success', 'Cập nhập dữ liệu thành công')
      } else if (body.code === 417) {
        showNotification('topRight', 'error', 'Dữ liệu không tồn tại')
      } else if (body.code === 401 || body.code === 400) {
        showNotification('topRight', 'error', 'Quá trình xác thực xảy ra lỗi!')
      } else {
        showNotification('topRight', 'error', 'Quá trình cập nhập dữ liệu xảy ra lỗi')
      }
    })
    .catch(function (err) {
      if (err.message) {
        showNotification('topRight', 'error', err.message)
        throw new SubmissionError({ _error: err.message })
      } else {
        showNotification('topRight', 'error', JSON.stringify(err))
        throw new SubmissionError({ _error: JSON.stringify(err) })
      }
    })
  })
}

export const editAboutUs =
  (values, dispatch, props) => {
    const url = 'updateAboutUs'
    const itemData = props.items[props.itemIndex]

    let params = R.merge({ aboutUsId: itemData.id })(values)

    if (params.imageUrl) {
      dispatch(fetchAboutUsBegin())
      const keys = Object.keys(params.imageUrl)

      async.each(keys, function(key, callback) {
        const storageRef = firebase.storage().ref(key + '.png')
        const base64result = R.split(',', params.imageUrl[key])

        if (base64result.length === 1) {
          callback()
          return
        }

        storageRef.putString(base64result[1], 'base64').then(function(snapshot) {
          params.imageUrl[key] = snapshot.downloadURL
          callback()
        })
      }, function(err) {
        if (err) {
          showNotification('topRight', 'error', 'Quá trình Upload hình xảy ra lỗi!')
        } else {
          updateEvent(params, url, itemData, values, dispatch, props)
        }
      })
    } else {
      dispatch(fetchAboutUsBegin())
      updateEvent(params, url, itemData, values, dispatch, props)
    }
  }
