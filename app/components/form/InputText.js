import React from 'react'

// We receive props from ReduxForm's Field
// and turn them into props for Bootstrap forms
const InputText = (props) => {
  const { holderText, input, label, type = 'text' } = props
  // pass onBlur to enable touched flag
  // pass onChange so the ReduxForm can work
  const { value, onChange } = input

  return (
    <div className='form-group'>
      {label && <label>{label}</label>}
      <input type={type} className='form-control' name='email' placeholder={holderText} required='true' value={value} onChange={onChange}/>
    </div>
  )
}

export default InputText
