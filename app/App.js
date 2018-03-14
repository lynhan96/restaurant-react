import React from 'react'

import Header from 'components/layout/Header'
import SideBar from 'components/layout/SideBar'

const App = (props) => {
  const { children } = props

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

export default App
