import React from 'react'
import { Field } from 'redux-form'

import ErrorMessage from 'components/ErrorMessage'
import InputText from 'components/form/InputText'
import Editor from 'components/form/Editor'
import SubmitButton from 'components/form/SubmitButton'
import { isRequired } from 'lib/validators'

const PageForm = (props) => {
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
            <Field
              name='content'
              component={Editor}
              label='Content:'
            />
          </div>
        </div>

        <div className='row'>
          <div className='col-md-4'>
            <SubmitButton
              text='Update Page'
              submitting={submitting}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default PageForm
