import React from 'react'

// We receive props from ReduxForm's Field
// and turn them into props for Bootstrap forms
const InputText = (props) => {
  const { required, input, label, type = 'text' } = props
  const { value, onChange } = input

  return (
    <div className='form-group label-floating'>
      {label && <label className='control-label'>{label}</label>}
      <input type={type} className='form-control' required={required} value={value} onChange={onChange}/>
    </div>
  )
}

export default InputText
