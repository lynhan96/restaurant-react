import React from 'react'
import CKEditor from 'react-ckeditor-component'

// We receive props from ReduxForm's Field
// and turn them into props for Bootstrap forms
const CkEditor = (props) => {
  const { name, defaultValue, input, label } = props
  const { onChange } = input

  return (
    <div className='form-group label-floating' style={{ marginTop: '0' }}>
      <label>{label}</label>
      <CKEditor
        name={name}
        activeClass='p10'
        content={defaultValue}
        events={{
          'change': onChange
        }}
       />
    </div>
  )
}

export default CkEditor
