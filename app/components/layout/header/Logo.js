import React from 'react'

const Logo = (props) => {
  return (
    <div style={styles.wrapper}>
      <span style={styles.main}>Supply Chain</span>
      <span style={styles.sub}> Asia</span>
      <span style={styles.end}> Fellowship</span>
    </div>
  )
}

const styles = {
  wrapper: {
    fontSize: 17
  },
  main: {
    color: 'white'
  },
  sub: {
    color: '#f7a400'
  },
  end: {
    color: 'grey',
    fontStyle: 'italic'
  }
}

export default Logo
