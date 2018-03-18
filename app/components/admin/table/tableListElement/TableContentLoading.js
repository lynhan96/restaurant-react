import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'

const TableContentLoading = (props) => {
  const { message } = props

  return (
    <div style={style.loadingWrapper}>
      <CircularProgress size={60} thickness={7} />
      <p style={style.loadingText}>{message}</p>
    </div>
  )
}

export default TableContentLoading

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
