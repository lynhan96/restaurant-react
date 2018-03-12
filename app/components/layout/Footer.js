import React from 'react'

import IconSocial from 'components/layout/header/IconSocial'

const Footer = () => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.info} className='container'>
        <div className='row'>
          <div className='col-sm-6'>
            <b>ABOUT US</b>
            <br/>
            <br/>
            <span>Supply Chain Asia is a not-for-profit professional body that aims to bring professionals from within the logistics and supply chain industry together to share knowledge, learn from one another and create opportunities for collaborations.</span>
            <br/>
            <br/>
            <br/>
            <IconSocial alignLeft={true} />
            <br/>
            <br/>
          </div>
          <div className='col-sm-6'>
            <b>CONTACT US</b>
            <br/>
            <br/>
            <strong>Address:</strong> 8 Bulim Avenue, #08-07 (INSPIRE Lobby) Supply Chain City, Singapore 648166
            <br/>
            <strong>Telephone No.:</strong>+65 87992357
            <br/>
            <strong>Email:</strong> <a style={styles.link} href='mailto:admin@scasia.org'>admin@scasia.org</a>
            <br/>
            Co. Reg No (201216027H)
            <br/>
            GST Reg No (201216027H)
            <br/>
            <br/>
          </div>
        </div>
      </div>
      <div style={styles.copyright}>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-12'>
              <br/>
              ©2016 Supply Chain Asia. Developed and managed by Gigaquirks Pte Ltd.
              <br/>
              <br/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer

const styles = {
  wrapper: {
    background: '#282828',
    color: '#b7b7b7',
    fontSize: 14,
    marginTop: 30
  },
  info: {
    paddingTop: 50
  },
  link: {
    color: '#b7b7b7'
  },
  copyright: {
    borderTop: '1px solid #444444'
  }
}
