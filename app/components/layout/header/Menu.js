import React from 'react'
import { Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap/lib'

import Navigator from 'lib/Navigator'
import { requestLogout } from 'ducks/admin'

const goto = (url) => () => Navigator.push(url)

const MenuLink = (props) => {
  const { url, text } = props

  return (
    <NavItem href='#' onClick={goto(url)}>{text}</NavItem>
  )
}

const renderAdminMenu = (logout) => {
  return (
    <Nav>
      <MenuLink url='admin/users' text='Users'/>
      <MenuLink url='admin/pages' text='Pages'/>
      <MenuLink url='admin/sets' text='Sets'/>
      <NavDropdown title='Account' id='account'>
        <NavItem href='#' onClick={logout}>Logout</NavItem>
      </NavDropdown>
    </Nav>
  )
}

const renderPublicMenu = () => {
  return (
    <Nav>
      <MenuLink url='/' text='Home' />
      <MenuLink url='p/overview' text='OVERVIEW'/>
      <MenuLink url='p/steps-to-join' text='STEPS TO JOIN'/>
      <MenuLink url='p/benefits' text='BENEFITS'/>
      <MenuLink url='validation' text='APPLY NOW'/>
      <NavDropdown title='ABOUT US' id='about'>
        <NavItem href='#' onClick={goto('p/about-sca')}>About Supply Chain Asia</NavItem>
        <NavItem href='#' onClick={goto('p/about')}>About SCF Committee</NavItem>
        <NavItem href='#' onClick={goto('p/contact')}>Contact</NavItem>
      </NavDropdown>
    </Nav>
  )
}

const dispatchLogout = (dispatch) => () => {
  if (confirm('Are you sure you want to logout?')) {
    dispatch(requestLogout())
  }
}

const Menu = (props) => {
  const { signedIn, dispatch, isDesktopMenu } = props
  const logout = dispatchLogout(dispatch)

  if (isDesktopMenu) {
    return (
      <Navbar className='hidden-xs desktop-menu-bar' style={styles.desktopMenuBar}>
        {signedIn ? renderAdminMenu(logout) : renderPublicMenu()}
      </Navbar>
    )
  } else {
    return (
      <div className='hidden-sm hidden-md hidden-lg'>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {signedIn ? renderAdminMenu(logout) : renderPublicMenu()}
        </Navbar.Collapse>
      </div>
    )
  }
}

const styles = {
  desktopMenuBar: {
    backgroundColor: '#f5a300',
    border: 'none'
  }
}

export default Menu
