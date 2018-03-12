import React from 'react'

const App = (props) => {
  const { children } = props

  return (
    <div style={styles.container}>
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
