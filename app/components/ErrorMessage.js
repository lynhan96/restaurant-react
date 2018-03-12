import React from 'react'
import { Alert } from 'react-bootstrap/lib'

const ErrorMessage = (props) => {
  const { text } = props

  return (
    <Alert bsStyle="danger">
      <p>{text}</p>
    </Alert>
  )
}

export default ErrorMessage
