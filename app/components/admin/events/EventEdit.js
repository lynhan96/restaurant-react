import React from 'react'
import R from 'ramda'
import ReactQueryParams from 'react-query-params'
import { connect } from 'react-redux'

import ContentLoading from 'components/ContentLoading'
import { isAdmin } from 'components/wrappers/isAdmin'
import { editFieldInfo, deleteEvent, selectFieldData, customSelectFieldData } from '../../../lib/actions/foodCategory'
import TableEditItem from 'components/admin/table/TableEditItem'
import { editEvent } from 'lib/actions/event'

class EventEdit extends ReactQueryParams {
  render() {
    const { error, loading, events, dispatch } = this.props
    const params = this.queryParams

    if (error) {
      return (
        <ContentLoading
          message='Quá trình tải dữ liệu xảy ra lỗi!'
        />
      )
    }

    if (loading) {
      return (
        <ContentLoading
          message='Đang Cập nhập dữ liệu ...'
        />
      )
    }

    return (
      <div className='content'>
        <div className='container-fluid animated fadeIn'>
          <TableEditItem
            editFieldInfo={editFieldInfo()}
            selectFieldData={selectFieldData()}
            customSelectFieldData={customSelectFieldData()}
            editHeader='Chỉnh sửa thông tin Sự kiện'
            arrLink={{ list: 'food-categories', view: 'food-category-view' }}
            itemIndex={params.index}
            subHeader={events[params.index].name}
            submitEdit={editEvent}
            items={events}
            dispatch={dispatch}
            deleteItem={deleteEvent}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  events: state.event.items,
  loading: state.event.loading,
  error: state.event.error
})

export default R.pipe(
  connect(mapStateToProps),
  isAdmin
)(EventEdit)
