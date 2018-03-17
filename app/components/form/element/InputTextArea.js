import React from 'react'
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap/lib'

const InputTextArea = (props) => {
  const { input, meta, label, height = 100 } = props
  const { value, onChange, onBlur } = input
  const { touched, error } = meta
  const validationState = !touched ? null : error ? 'error' : 'success'

  return (
    <FormGroup validationState={validationState}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl
        componentClass='textarea'
        style={{height: `${height}px`}}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
      />
      {touched && error && <HelpBlock>{error}</HelpBlock>}
      <FormControl.Feedback />
    </FormGroup>
  )
}

export default InputTextArea
