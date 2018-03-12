import React from 'react'
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap/lib'

// We receive props from ReduxForm's Field
// and turn them into props for Bootstrap forms
const InputText = (props) => {
  const { input, type = 'text' } = props
  // pass onBlur to enable touched flag
  // pass onChange so the ReduxForm can work
  const { value, onChange } = input

  return (
    <div className='form-group has-feedback'>
      <input type={type} className='form-control' name='email' placeholder='Email' required='true' value={value} onChange={onChange}/>
      <span className='glyphicon glyphicon-envelope form-control-feedback'></span>
    </div>
  )
}

export default InputText
