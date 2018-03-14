import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { dispatchLogout } from 'ducks/admin'

const SideBar = (props) => {
  const { signedIn, dispatch } = props
  const logout = dispatchLogout(dispatch)

  if (signedIn) {
    return (
      <div className='sidebar' data-color='purple' data-image='../images/sidebar-1.jpg'>
        <div className='logo'>
          <Link to='dashboard' className='simple-text'>
            BK Food
          </Link>
        </div>
        <div className='sidebar-wrapper'>
          <ul className='nav'>
            <li className='active'>
              <Link to='dashboard'>
                <i className='material-icons'>dashboard</i>
                <p>Dashboard</p>
              </Link>
            </li>
            <li>
              <Link to='employees'>
                <i className='material-icons'>account_circle</i>
                <p>Nhân viên</p>
              </Link>
            </li>
            <li>
              <Link to='#' onClick={logout}>
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
