import React from 'react'
import { Navbar } from 'react-bootstrap/lib'

const OtherLogo = (props) => {
  return (
    <Navbar className='hidden-xs' style={styles.logoWrapper}>
      <div className='col-sm-3'>
        <img style={styles.logo_sca} src='https://firebasestorage.googleapis.com/v0/b/sca-fellowship-5d601.appspot.com/o/static%2Fbanner_logo_sca.png?alt=media&token=4220c609-1f98-4c0f-b574-40974aef16cb' />
      </div>
      <div className='col-sm-3'>
        <img style={styles.logo_sca} src='https://firebasestorage.googleapis.com/v0/b/sca-fellowship-5d601.appspot.com/o/static%2Fbanner_logo_fellowship.png?alt=media&token=58a0e0fe-e933-4687-95b1-016005d07020' />
      </div>
      <div className='col-sm-3'>
      </div>
      <div className='col-sm-3'>
        <img style={styles.logo_sca} src='https://firebasestorage.googleapis.com/v0/b/sca-fellowship-5d601.appspot.com/o/static%2Fbanner_logo_advancing.png?alt=media&token=260dc5a3-d5f1-4f76-bdb8-f71370c68c42' />
      </div>
    </Navbar>
  )
}

const styles = {
  logoWrapper: {
    backgroundColor: 'transparent',
    border: 'none'
  },
  logo_sca: {
    width: '100%'
  }
}

export default OtherLogo
