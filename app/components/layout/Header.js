import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Navbar } from 'react-bootstrap/lib'

import Logo from 'components/layout/header/Logo'
import IconSocial from 'components/layout/header/IconSocial'
import OtherLogo from 'components/layout/header/OtherLogo'
import Menu from 'components/layout/header/Menu'

const Header = (props) => {
  const { signedIn, dispatch } = props

  return (
    <div>
      <Navbar inverse={true} collapseOnSelect={true}>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'><Logo /></Link>
          </Navbar.Brand>
          <Menu dispatch={dispatch} signedIn={signedIn} />
        </Navbar.Header>
        <IconSocial />
      </Navbar>
      <OtherLogo />
      <Menu dispatch={dispatch} signedIn={signedIn} isDesktopMenu={true} />
    </div>
  )
}

const mapStateToProps = (state) => state.admin

export default connect(mapStateToProps)(Header)
