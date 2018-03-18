import React from 'react'
import { Field } from 'redux-form'

import EditFormInputText from 'components/form/element/EditFormInputText'
import InputDateTime from 'components/form/element/InputDateTime'
import SubmitButton from 'components/form/element/SubmitButton'
import SelectField from 'components/form/element/SelectField'

// This form is pure so it is easy to test
// Page/Login will decorate it with the necessary props

const checkFieldType = type => {
  switch (type) {
    case 'datetime':
      return InputDateTime
    case 'select':
      return SelectField
    default:
      return EditFormInputText
  }
}

const EditForm = (props) => {
  const { selectFieldData, items, itemIndex, editFieldInfo, submitting, handleSubmit, onSubmit } = props
  handleSubmit.onSubmit = onSubmit
  const data = items[itemIndex]

  return (
    <form onSubmit={handleSubmit}>
      {editFieldInfo.map((item, index) => {
        return (
          <div className='col-md-6' key={index}>
            <Field
              name={item.fieldName}
              component={checkFieldType(item.type)}
              selectFieldData={selectFieldData}
              label={item.viewTitle}
              required={item.isRequired}
              defaultValue={data[item.fieldName]}
              type={item.type}
              fieldName={item.fieldName}
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

export default EditForm
