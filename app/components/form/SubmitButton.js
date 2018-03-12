import React from 'react'
import Button from 'react-bootstrap/lib/Button'

const SubmitButton = (props) => {
  const { onClick, submitting, text = 'Submit', submittingText = 'Submitting...' } = props

  return (
    <Button
      bsStyle='success'
      type='submit'
      onClick={onClick}
      disabled={submitting}>
      {submitting ? submittingText : text}
    </Button>
  )
}

export default SubmitButton
