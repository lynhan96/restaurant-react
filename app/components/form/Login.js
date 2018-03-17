import React from 'react'
import { Field } from 'redux-form'

import InputText from 'components/form/element/InputText'
import SubmitButton from 'components/form/element/SubmitButton'

// This form is pure so it is easy to test
// Page/Login will decorate it with the necessary props
const LoginForm = (props) => {
  const { submitting, handleSubmit } = props
  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <Field
        name='email'
        component={InputText}
        label='Email'
        type='email'
        required={true}
      />
      <Field
        name='password'
        component={InputText}
        label='Password'
        type='password'
        required={true}
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
