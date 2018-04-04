import React, { Component } from 'react'
import { connect } from 'react-redux'
import R from 'ramda'
import { isAdmin } from 'components/wrappers/isAdmin'
import ContentLoading from 'components/ContentLoading'

class AddZoneModal extends Component {
  render() {
    const { error } = this.props

    if (error) {
      return (
        <ContentLoading
          error={error}
          message='Quá trình tải dữ liệu xảy ra lỗi!'
        />
      )
    }

    return (
      <div>TEST</div>
    )
  }
}

const mapStateToProps = state => ({
})

export default R.pipe(
  connect(mapStateToProps),
  isAdmin
)(AddZoneModal)
