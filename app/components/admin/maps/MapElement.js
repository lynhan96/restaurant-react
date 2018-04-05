import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import R from 'ramda'
import 'styles/website.less'

import { isAdmin } from 'components/wrappers/isAdmin'
import ContentLoading from 'components/ContentLoading'
import Draggable from 'react-draggable'

const avatarStyle = {
  backgroundImage: 'url("images/table-8-chairs.png")'
}

class MapElement extends Component {
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
      <Draggable
        allowAnyClick={true}
        axis='both'
        handle='.handle'
        bounds='parent'
        defaultPosition={{x: 300, y: 300}}
        grid={[5, 5]}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}>
        <div className='table handle'>
          <Link to='#' style={{ float: 'right', position: 'absolute', marginLeft: '20px' }}>
            <img src='images/delete.png' style={{ marginTop: '45px', width: '25px', height: '25px' }} />
          </Link>
          <div style={avatarStyle} className='table-wrapper'>
            <input className='table-number' defaultValue={'test'} />
            <input className='table-number' readOnly value={'test'} style={{ background: 'red', color: 'white' }} />
          </div>
        </div>
      </Draggable>
    )
  }
}

const mapStateToProps = state => ({
})

export default R.pipe(
  connect(mapStateToProps),
  isAdmin
)(MapElement)
