import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { adminHasSignedOut } from 'ducks/admin'

const dispatchLogout = (dispatch) => () => {
  if (confirm('Are you sure you want to logout?')) {
    dispatch(adminHasSignedOut())
  }
}

const Header = (props) => {
  const { signedIn, dispatch, data } = props
  const logout = dispatchLogout(dispatch)

  if (signedIn) {
    return (
      <header className='main-header'>
        <a href='' className='logo'>
          <span className='logo-mini'><b>BK</b></span>
          <span className='logo-lg'><b>BK Food</b></span>
        </a>
        <nav className='navbar navbar-static-top'>
          <a href='' className='sidebar-toggle' data-toggle='push-menu' role='button'>
            <span className='sr-only'>Toggle navigation</span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
          </a>
          <div className='navbar-custom-menu'>
            <ul className='nav navbar-nav'>
              <li className='dropdown notifications-menu'>
                <a href='' className='dropdown-toggle' data-toggle='dropdown'>
                  <i className='fa fa-bell-o'></i>
                  <span className='label label-warning'>10</span>
                </a>
                <ul className='dropdown-menu'>
                  <li className='header'>Bạn có 10 thông báo</li>
                  <li>
                    <ul className='menu'>
                      <li>
                        <a href=''>
                          <i className='fa fa-users text-aqua'></i> 5 Phản hồi từ người dùng
                        </a>
                      </li>
                      <li>
                        <a href=''>
                          <i className='fa fa-warning text-yellow'></i> 5 Yêu cầu cấp quyền sửa Order
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className='footer'><a href=''>Xem tất cả</a></li>
                </ul>
              </li>
              <li className='dropdown user user-menu'>
                <a href='' className='dropdown-toggle' data-toggle='dropdown'>
                  <img className='user-image' alt='Error' />
                  <span className='hidden-xs'>{data.name}</span>
                </a>
                <ul className='dropdown-menu'>
                  <li className='user-header'>
                    <img className='img-circle' alt='Error' />
                    <p>
                      {data.name} - {data.position}
                    </p>
                  </li>
                  <li className='user-footer'>
                    <div className='pull-left'>
                      <Link to='/profile' className='btn btn-default btn-flat'>Trang cá nhân</Link>
                    </div>
                    <div className='pull-right'>
                      <Link className='btn btn-default btn-flat' to='/login' onClick={logout}>Thoát</Link>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    )
  } else {
    return (<div/>)
  }
}

const mapStateToProps = (state) => state.admin

export default connect(mapStateToProps)(Header)
