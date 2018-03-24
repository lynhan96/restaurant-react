import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { dispatchLogout } from 'ducks/admin'

const SideBar = (props) => {
  const { signedIn, dispatch, activeLink } = props
  const logout = dispatchLogout(dispatch)

  if (signedIn) {
    return (
      <div className='sidebar slde-bar-bg-image' data-color='purple'>
        <div className='logo'>
          <Link to='dashboard' className='simple-text'>
            BK Food
          </Link>
        </div>
        <div className='sidebar-wrapper'>
          <ul className='nav'>
            <li className={activeLink === 'dashboard' ? 'active' : ''}>
              <Link to='dashboard'>
                <i className='material-icons'>dashboard</i>
                <p>Trang chủ</p>
              </Link>
            </li>
            <li className={activeLink === 'employees' ? 'active' : ''}>
              <Link to='employees'>
                <i className='material-icons'>account_circle</i>
                <p>Nhân viên</p>
              </Link>
            </li>
            <li className={activeLink === 'food-categories' ? 'active' : ''}>
              <Link to='food-categories'>
                <i className='material-icons'>content_paste</i>
                <p>Danh mục thức ăn</p>
              </Link>
            </li>
            <li>
              <Link to='#' onClick={e => { e.preventDefault(); logout() }}>
                <i className='material-icons'>subdirectory_arrow_right</i>
                <p>Thoát</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    )
  } else {
    return (<div/>)
  }
}

const mapStateToProps = (state) => state.admin

export default connect(mapStateToProps)(SideBar)
