import { database } from 'database/database'
import R from 'ramda'

import { getAdminData, getOrderingState } from 'lib/Constant'
import Navigator from 'lib/Navigator'
import { showNotification } from './showNotification'
import { sortObjectsByKeyAtoZ, sortObjectsByKeyZtoA } from 'lib/objects'

export const FETCH_ORDERING_BEGIN = 'FETCH_ORDERING_BEGIN'
export const FETCH_ORDERING_SUCCESS = 'FETCH_ORDERING_SUCCESS'
export const FETCH_ORDERING_ERROR = 'FETCH_ORDERING_ERROR'
export const FETCH_ORDERING_SORT_VALUE = 'FETCH_ORDERING_SORT_VALUE'
export const FETCH_ORDERING_TOTAL_PAGE = 'FETCH_ORDERING_TOTAL_PAGE'

export const tableHeader = () => ([
  { 'fieldName': 'id', 'viewTitle': 'ID' },
  { 'fieldName': 'transactionId', 'viewTitle': 'Mã hóa đơn' },
  { 'fieldName': 'status', 'viewTitle': 'Trạng thái' },
  { 'fieldName': 'userName', 'viewTitle': 'Khách hàng' },
  { 'fieldName': 'totalPrice', 'viewTitle': 'Tổng tiền' },
  { 'fieldName': 'createdAt', 'viewTitle': 'Thời gian' }
])

export const viewLabelHeader = () => ([
])

export const editFieldInfo = () => ([
])

export const selectFieldData = () => ({
})

export const fetchOrderingsBegin = () => ({
  type: FETCH_ORDERING_BEGIN
})

export const fetchOrderingsSuccess = items => ({
  type: FETCH_ORDERING_SUCCESS,
  items: items
})

export const fetchOrderingsError = error => ({
  type: FETCH_ORDERING_ERROR,
  error: error
})

export const fetchOrderingsSortValue = (fieldName, sortType) => ({
  type: FETCH_ORDERING_SORT_VALUE,
  sortType: sortType,
  sortBy: fieldName
})

export const fetchOrderingsTotalPage = totalPage => ({
  type: FETCH_ORDERING_TOTAL_PAGE,
  totalPage: totalPage
})

export const searchByKeyword = (event, dispatch) => {
  dispatch(fetchOrderings({keyword: event.target.value}))
  dispatch(fetchOrderingsSortValue('id', 'AtoZ'))
}

export const changePagination = (offset, sortFieldName, sortType, dispatch) => {
  if (sortType === 'AtoZ') {
    dispatch(fetchOrderings({sortBy: sortFieldName, sortDir: 'asc', offset: offset}))
  } else {
    dispatch(fetchOrderings({sortBy: sortFieldName, sortDir: 'desc', offset: offset}))
  }
}

export const sortByKey = (datas, fieldName, currentFieldName, sortType, dispatch) => {
  dispatch(fetchOrderingsBegin())

  if (sortType === 'AtoZ' && fieldName === currentFieldName) {
    dispatch(fetchOrderingsSortValue(fieldName, 'ZtoA'))
  } else {
    dispatch(fetchOrderingsSortValue(fieldName, 'AtoZ'))
  }

  dispatch(fetchOrderings())
}

const makeOrderingData = (datas, state, params) => {
  let offset = 0
  if (params && params.offset) {
    offset = params.offset
  }

  if (state.sortType === 'AtoZ') {
    return sortObjectsByKeyAtoZ(datas, state.sortBy, offset, 50)
  }

  return sortObjectsByKeyZtoA(datas, state.sortBy, offset, 50)
}

export const fetchOrderings = params => {
  return dispatch => {
    dispatch(fetchOrderingsBegin())
    const orderingState = getOrderingState()

    const ref = database.ref(getAdminData().vid + '/orders')
    ref.once('value')
      .then((snapshot) => {
        dispatch(fetchOrderingsTotalPage(R.values(snapshot.val()).length / 50))
        dispatch(fetchOrderingsSuccess(makeOrderingData(snapshot.val(), orderingState, params)))
      })
      .then(() => {
        ref.on('value', (result) => {
          dispatch(fetchOrderingsTotalPage(R.values(result.val()).length / 50))
          dispatch(fetchOrderingsSuccess(makeOrderingData(result.val(), orderingState, params)))
        })
      })
      .catch((error) => console.log(error))
  }
}

export const deleteOrdering = (dispatch, orderingId, itemIndex, currentAction) => {
  return new Promise((resolve) => {
    const ref = database.ref(getAdminData().vid + '/orders').child(orderingId)
    ref.remove()

    Navigator.push('orderings')

    showNotification('topRight', 'info', 'Xóa dữ liệu thành công')
  })
}
