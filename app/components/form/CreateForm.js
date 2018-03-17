import React from 'react'
import { Field } from 'redux-form'

import InputText from 'components/form/InputText'
import SubmitButton from 'components/form/SubmitButton'

const CreateForm = (props) => {
  const { editLabelHeader, submitting, handleSubmit, onSubmit } = props
  handleSubmit.onSubmit = onSubmit

  return (
    <form onSubmit={handleSubmit}>
      {editLabelHeader.map((item, index) => {
        return (
          <div className='col-md-6' key={index}>
            <Field
              name={item.fieldName}
              component={InputText}
              label={item.viewTitle}
              defaultValue=''
              type='text'
            />
          </div>
        )
      })}
      <div className='col-md-12' style={{ textAlign: 'center' }}>
        <SubmitButton
          text='Xác nhận'
          submitting={submitting}
          className='btn btn-primary'
        />
      </div>
    </form>
  )
}

export default CreateForm
