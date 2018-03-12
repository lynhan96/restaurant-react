import React from 'react'
import R from 'ramda'
import { FormGroup, ControlLabel, FormControl, HelpBlock, Radio } from 'react-bootstrap/lib'

const optionToHTML = (props) => {
  const { optionValue, optionTitle, optionDescription, value, onChange, onBlur } = props
  const checked = optionValue === value
  return (
    <Radio
      onChange={onChange}
      onBlur={onBlur}
      checked={checked}
      value={optionValue}
      key={optionValue}
      >
      {optionTitle}
      {optionDescription &&
        <small><br/>{optionDescription}<br/><br/></small>
      }
    </Radio>
  )
}

const RadioOptions = (props) => {
  const { input, meta, label, options } = props
  const { touched, error } = meta
  const validationState = !touched ? null : error ? 'error' : 'success'

  const optionsHTML = R.pipe(
    R.map(R.merge(input)),
    R.map(optionToHTML)
  )(options)

  return (
    <FormGroup validationState={validationState}>
      <ControlLabel>{label}</ControlLabel>
      {optionsHTML}
      {touched && error && <HelpBlock>{error}</HelpBlock>}
      <FormControl.Feedback />
    </FormGroup>
  )
}

export default RadioOptions
