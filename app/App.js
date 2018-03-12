import React from 'react'
import Grid from 'react-bootstrap/lib/Grid'

import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'

const App = (props) => {
  const { children } = props

  return (
    <div style={styles.container}>
      <Header />
      <Grid style={styles.mainContainer}>
        {children}
      </Grid>
      <Footer />
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
