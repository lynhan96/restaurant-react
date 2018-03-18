import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'

const ContentLoading = (props) => {
  const { message } = props

  return (
    <div className='content'>
      <div className='container-fluid'>
        <div className='card'>
          <div style={style.loadingWrapper}>
            <CircularProgress size={60} thickness={7} />
            <p style={style.loadingText}>{message}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentLoading

const style = {
  loadingWrapper: {
    textAlign: 'center',
    margin: '30px'
  },
  loadingIcon: {
    fontSize: '30px'
  },
  loadingText: {
    fontSize: '17px',
    marginTop: '10px'
  }
}
