import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Interactive from 'lib/interact.js'
import R from 'ramda'
import 'styles/website.less'

import { isAdmin } from 'components/wrappers/isAdmin'
import { updateActiveLink } from 'ducks/admin'
import ContentLoading from 'components/ContentLoading'

const draggableOptions = {
  inertia: true,
  restrict: {
    restriction: 'parent',
    elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
  },
  autoScroll: true,
  onmove: event => {
    const target = event.target
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    target.style.webkitTransform =
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
  }
}

const avatarStyle = {
  backgroundImage: 'url("images/table-8-chairs.png")'
}

const contentBackground = {
  backgroundImage: 'url("images/background.jpg")',
  padding: '5px'
}

const generateTable = (tableName, status) => {
  return (
    <Interactive draggable draggableOptions={draggableOptions}>
      <div className='table'>
        <Link to='' style={avatarStyle} className='table-wrapper'>
          <input className='table-number' readOnly value={tableName} style={{ color: 'black' }}/>
          <input className='table-number' readOnly value={status} style = {{ background: 'red', color: 'white' }} />
        </Link>
      </div>
    </Interactive>
  )
}

class MapTable extends Component {
  componentDidMount() {
    this.props.dispatch(updateActiveLink('map-tables'))
  }

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
      <div className='content'>
        <div className='container-fluid animated fadeIn'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='card'>
                <div className='card-header' data-background-color='purple'>
                </div>
                <section style={contentBackground}>
                  <div className='container-fluid table-container'>
                    {generateTable('Bàn 1', 'Đang có khách')}
                    {generateTable('Bàn 2', 'Còn trống')}
                    {generateTable('Bàn 3', 'Còn trống')}
                    {generateTable('Bàn 4', 'Đã đặt')}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
})

export default R.pipe(
  connect(mapStateToProps),
  isAdmin
)(MapTable)
