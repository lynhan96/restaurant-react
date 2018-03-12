import React from 'react'

const ErrorMessage = (props) => {
  const { text } = props

  return (
    <div className="alert alert-danger alert-dismissible">
      <button type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
      <i className="icon fa fa-ban"></i>
      {text}
    </div>
  )
}

export default ErrorMessage
