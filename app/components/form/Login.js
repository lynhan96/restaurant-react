import React from 'react'
import { Field } from 'redux-form'

import ErrorMessage from 'components/ErrorMessage'
import InputText from 'components/form/InputText'
import SubmitButton from 'components/form/SubmitButton'
import { isRequired, isEmail } from 'lib/validators'

// This form is pure so it is easy to test
// Page/Login will decorate it with the necessary props
const LoginForm = (props) => {
  const { error, submitting, handleSubmit } = props

  return (
    <div className='row'>
      <div className='col-md-6'>
        {error && <ErrorMessage text={error} />}
        <form onSubmit={handleSubmit}>
          <Field
            name='email'
            component={InputText}
            validate={[ isRequired, isEmail ]}
            label='Email:'
          />
          <Field
            name='password'
            component={InputText}
            validate={isRequired}
            label='Password:'
            type='password'
          />

        <SubmitButton
          text='Login'
          submitting={submitting}
        />
      </form>
    </div>
    <div className='col-md-6'/>
  </div>
  )
}

export default LoginForm
