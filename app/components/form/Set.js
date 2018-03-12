import React from 'react'
import { Field } from 'redux-form'

import ErrorMessage from 'components/ErrorMessage'
import InputText from 'components/form/InputText'
import InputTextArea from 'components/form/InputTextArea'
import Select from 'components/form/Select'
import SelectBoolean from 'components/form/SelectBoolean'
import SubmitButton from 'components/form/SubmitButton'
import { isRequired, isNumber } from 'lib/validators'

const categoryOptions = [
  { label: 'General', value: 'General' },
  { label: 'Industry', value: 'Industry' },
  { label: 'Specialisation', value: 'Specialisation' }
]

const SetForm = (props) => {
  const { error, submitting, handleSubmit } = props

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col-md-12'>
            {error && <ErrorMessage text={error} />}
            <Field
              name='title'
              component={InputText}
              validate={[ isRequired ]}
              label='Title:'
            />
          </div>
        </div>

        <div className='row'>
          <div className='col-md-12'>
            {error && <ErrorMessage text={error} />}
            <Field
              name='overview'
              component={InputTextArea}
              validate={[ isRequired ]}
              label='Overview:'
            />
          </div>
        </div>

        <div className='row'>
          <div className='col-md-4'>
            <Field
              name='category'
              component={Select}
              validate={[ isRequired ]}
              label='Category:'
              options={categoryOptions}
            />
          </div>

          <div className='col-md-4'>
            <Field
              name='published'
              component={SelectBoolean}
              validate={[ isRequired ]}
              label='Publish:'
            />
          </div>

          <div className='col-md-4'>
            <Field
              name='ordering'
              component={InputText}
              validate={[ isRequired, isNumber ]}
              label='Ordering:'
            />
          </div>
        </div>

        <div className='row'>
          <div className='col-md-4'>
            <SubmitButton
              text='Save Set'
              submitting={submitting}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default SetForm
