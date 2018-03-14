import React from 'react'
import { connect } from 'react-redux'

import Header from 'components/layout/Header'
import SideBar from 'components/layout/SideBar'

const App = (props) => {
  const { signedIn, children } = props

  if (!signedIn) {
    return (
      <div className='wrapper'>
        {children}
      </div>
    )
  }

  return (
    <div className='wrapper'>
      <SideBar/>
      <div className='main-panel'>
        <Header/>
        {children}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => state.admin

export default connect(mapStateToProps)(App)
