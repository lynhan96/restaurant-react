import React from 'react'
import { Field, FieldArray } from 'redux-form'

import ErrorMessage from 'components/ErrorMessage'
import InputText from 'components/form/InputText'
import InputTextArea from 'components/form/InputTextArea'
import SubmitButton from 'components/form/SubmitButton'
import ResponsesFields from 'components/form/ResponsesFields'
import { isRequired } from 'lib/validators'

const QuestionForm = (props) => {
  const { error, submitting, handleSubmit } = props

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          {error && <ErrorMessage text={error} />}
          <div className='col-md-9'>
            <Field
              name='title'
              component={InputTextArea}
              validate={[ isRequired ]}
              label='Question:'
            />
          </div>

          <div className='col-md-3'>
            <Field
              name='ordering'
              component={InputText}
              validate={[ isRequired ]}
              label='Ordering:'
            />
          </div>
        </div>

        <div className='row'>
          <div className='col-md-12'>
            <Field
              name='definition'
              component={InputTextArea}
              validate={[ isRequired ]}
              label='Definition:'
              height={200}
            />
          </div>
        </div>

        <FieldArray name='responses' component={ResponsesFields} />

        <div className='row'>
          <div className='col-md-4'>
            <SubmitButton
              text='Save Question'
              submitting={submitting}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default QuestionForm
