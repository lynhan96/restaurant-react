import React from 'react'
import { Field } from 'redux-form'

import EditFormInputText from 'components/form/element/EditFormInputText'
import InputDateTime from 'components/form/element/InputDateTime'
import SubmitButton from 'components/form/element/SubmitButton'
import moment from 'moment'

// This form is pure so it is easy to test
// Page/Login will decorate it with the necessary props
const EditForm = (props) => {
  const { items, itemIndex, editLabelHeader, submitting, handleSubmit, onSubmit } = props
  handleSubmit.onSubmit = onSubmit
  const data = items[itemIndex]

  return (
    <form onSubmit={handleSubmit}>
      {editLabelHeader.map((item, index) => {
        if (item.fieldName === 'birthday') {
          data[item.fieldName] = moment.utc(data[item.fieldName]).add(7, 'hours').format('YYYY-MM-DD')
          return (
            <div className='col-md-6' key={index}>
              <Field
                name={item.fieldName}
                component={InputDateTime}
                label={item.viewTitle}
                required={item.isRequired}
                defaultValue={data[item.fieldName]}
              />
            </div>
          )
        }

        return (
          <div className='col-md-6' key={index}>
            <Field
              name={item.fieldName}
              component={EditFormInputText}
              label={item.viewTitle}
              required={item.isRequired}
              defaultValue={data[item.fieldName]}
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

export default EditForm
