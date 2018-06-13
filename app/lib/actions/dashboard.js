import request from 'request-promise'
import { showNotification } from './showNotification'
import { makeRequestOptions } from '../requestHeader'

export const FETCH_DASHBOARD_BEGIN = 'FETCH_DASHBOARD_BEGIN'
export const FETCH_DASHBOARD_SUCCESS = 'FETCH_DASHBOARD_SUCCESS'
export const FETCH_DASHBOARD_ERROR = 'FETCH_DASHBOARD_ERROR'
export const FETCH_DASHBOARD_SORT_VALUE = 'FETCH_DASHBOARD_SORT_VALUE'
export const FETCH_DASHBOARD_TOTAL_PAGE = 'FETCH_DASHBOARD_TOTAL_PAGE'

export const fetchDashboardBegin = () => ({
  type: FETCH_DASHBOARD_BEGIN
})

export const fetchDashboardSuccess = dashboard => ({
  type: FETCH_DASHBOARD_SUCCESS,
  dashboard: dashboard
})

export const fetchDashboardError = error => ({
  type: FETCH_DASHBOARD_SUCCESS,
  error: error
})

export const fetchDashboard = params => {
  return dispatch => {
    dispatch(fetchDashboardBegin())
    request(makeRequestOptions(params, 'dashboard')).then(body => {
      if (body.code === 401) {
        showNotification('topRight', 'error', 'Quá trình xác thực xảy ra lỗi!')
      } else {
        dispatch(fetchDashboardSuccess(body.data.dashboardInfo))
      }
    })
      .catch(err => dispatch(fetchDashboardError(err)))
  }
}
