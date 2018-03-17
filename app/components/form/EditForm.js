import React from 'react'
import { Field } from 'redux-form'

import EditFormInputText from 'components/form/EditFormInputText'
import SubmitButton from 'components/form/SubmitButton'
import moment from 'moment'

// This form is pure so it is easy to test
// Page/Login will decorate it with the necessary props
const EditForm = (props) => {
  const { data, editLabelHeader, submitting, handleSubmit, onSubmit } = props
  handleSubmit.onSubmit = onSubmit
  return (
    <form onSubmit={handleSubmit}>
      {editLabelHeader.map((item, index) => {
        if (item.fieldName === 'birthday' || item.fieldName === 'createdAt') {
          data[item.fieldName] = moment.utc(data[item.fieldName]).add(7, 'hours').format('YYYY-MM-DD hh:mm:ss')
        }
        return (
          <div className='col-md-6' key={index}>
            <Field
              name={item.fieldName}
              component={EditFormInputText}
              label={item.viewTitle}
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
