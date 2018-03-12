import React from 'react'
import Button from 'react-bootstrap/lib/Button'
import Navigator from 'lib/Navigator'

const onClick = () => Navigator.goBack()

const BackButton = (props) => {
  const { style, text = 'Back' } = props
  return (
    <Button
      style={style}
      onClick={onClick}>
      {text}
    </Button>
  )
}

export default BackButton
