import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { dispatchLogout } from 'ducks/admin'

const Header = (props) => {
  const { signedIn, dispatch, data } = props
  const logout = dispatchLogout(dispatch)

  if (signedIn) {
    return (
      <nav className='navbar navbar-expand-lg navbar-transparent  navbar-absolute bg-primary fixed-top'>
        <div className='container-fluid'>
           <div className='navbar-wrapper'>
              <div className='navbar-toggle'>
                <button type='button' className='navbar-toggler'>
                  <span className='navbar-toggler-bar bar1'/>
                  <span className='navbar-toggler-bar bar2'/>
                  <span className='navbar-toggler-bar bar3'/>
                </button>
              </div>
              <Link className='navbar-brand' href='#pablo'>Table List</Link>
           </div>
           <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navigation' aria-controls='navigation-index' aria-expanded='false' aria-label='Toggle navigation'>
              <span className='navbar-toggler-bar navbar-kebab'></span>
              <span className='navbar-toggler-bar navbar-kebab'></span>
              <span className='navbar-toggler-bar navbar-kebab'></span>
           </button>
           <div className='collapse navbar-collapse justify-content-end' id='navigation'>
              <form>
                 <div className='input-group no-border'>
                    <input type='text' value='' className='form-control' placeholder='Search...'/>
                    <span className='input-group-addon'>
                    <i className='now-ui-icons ui-1_zoom-bold'></i>
                    </span>
                 </div>
              </form>
              <ul className='navbar-nav'>
                 <li className='nav-item'>
                    <Link className='nav-link' href='#pablo'>
                       <i className='now-ui-icons media-2_sound-wave'></i>
                       <p>
                          <span className='d-lg-none d-md-block'>Stats</span>
                       </p>
                    </Link>
                 </li>
                 <li className='nav-item dropdown'>
                    <Link className='nav-link dropdown-toggle' href='http://example.com' id='navbarDropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                       <i className='now-ui-icons location_world'></i>
                       <p>
                          <span className='d-lg-none d-md-block'>Some Actions</span>
                       </p>
                    </Link>
                 </li>
                 <li className='nav-item'>
                    <Link className='nav-link' href='#pablo'>
                       <i className='now-ui-icons users_single-02'></i>
                       <p>
                          <span className='d-lg-none d-md-block'>Account</span>
                       </p>
                    </Link>
                 </li>
              </ul>
           </div>
        </div>
      </nav>
    )
  } else {
    return (<div/>)
  }
}

const mapStateToProps = (state) => state.admin

export default connect(mapStateToProps)(Header)
