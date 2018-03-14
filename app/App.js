import React from 'react'

import Header from 'components/layout/Header'
import SideBar from 'components/layout/SideBar'

const App = (props) => {
  const { children } = props
  return (
    <div style={styles.container}>
      <Header/>
      <SideBar/>
      {children}
    </div>
  )
}

export default App

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  mainContainer: {
    flex: '1',
    flexBasis: 'auto'
  }
}
