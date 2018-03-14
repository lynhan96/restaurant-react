import React from 'react'
import { Field } from 'redux-form'

import ErrorMessage from 'components/ErrorMessage'
import InputText from 'components/form/InputText'
import SubmitButton from 'components/form/SubmitButton'

// This form is pure so it is easy to test
// Page/Login will decorate it with the necessary props
const LoginForm = (props) => {
  const { error, submitting, handleSubmit } = props

  return (
    <form onSubmit={handleSubmit}>
      {error && <ErrorMessage text={error} />}
      <Field
        name='email'
        component={InputText}
        label='Email:'
        type='email'
        holderText='Email'
      />
      <Field
        name='password'
        component={InputText}
        label='Password:'
        type='password'
        holderText='Password'
      />
      <SubmitButton
        text='Đăng nhập'
        submitting={submitting}
        className='btn btn-primary btn-block btn-flat'
      />
     </form>
  )
}

export default LoginForm
