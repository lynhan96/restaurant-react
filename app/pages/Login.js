import React from 'react'
import { reduxForm } from 'redux-form'
import Navigator from 'lib/Navigator'

import LoginForm from 'components/form/Login'
import { submitLogin } from 'lib/submits/login'

const Login = (props) => {
  return (
    <div className='row'>
      <div className='col-md-12'>
        <h1>Login</h1>
      </div>
      <div className='col-md-6'>
        <DecoratedLoginForm />
      </div>
      <div className='col-md-6'/>
    </div>
  )
}

// Decorate LoginForm so that form is pure
const DecoratedLoginForm = reduxForm({
  form: 'login',
  // Separate submitLogin into another file
  // since the function is decoupled from Login
  onSubmit: submitLogin,
  // redirect after submit is successful
  onSubmitSuccess: () => Navigator.push('admin/users')
})(LoginForm)

export default Login
