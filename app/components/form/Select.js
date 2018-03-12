import React from 'react'
import R from 'ramda'
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap/lib'

const optionToHTML = (option) => {
  const { label, value } = option
  return <option key={value + label} value={value}>{label}</option>
}

const Select = (props) => {
  const { input, meta, label, options } = props
  const { value, onChange, onBlur } = input
  const { touched, error } = meta
  const validationState = !touched ? null : error ? 'error' : 'success'
  const optionsHTML = R.map(optionToHTML, options)

  return (
    <FormGroup validationState={validationState}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl
        componentClass='select'
        onBlur={onBlur}
        onChange={onChange}
        value={value}
      >
        {optionsHTML}
      </FormControl>
      {touched && error && <HelpBlock>{error}</HelpBlock>}
      <FormControl.Feedback />
    </FormGroup>
  )
}

export default Select
