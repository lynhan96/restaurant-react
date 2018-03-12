import React from 'react'
import { reduxForm } from 'redux-form'
import Navigator from 'lib/Navigator'

import LoginForm from 'components/form/Login'
import { submitLogin } from 'lib/submits/login'

const Login = (props) => {
  return (
    <div style={{ 'float': 'left', 'width': '100%', 'height': '100vh', 'background': '#222d32' }}>
      <div className='login-box'>
        <div className='login-logo'>
          <a href=''><b style={{ 'color': 'white' }}>Restaurant CMS</b></a>
        </div>
        <div className='login-box-body'>
          <p className='login-box-msg'>Đăng nhập</p>
          <DecoratedLoginForm />
        </div>
      </div>
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
  onSubmitSuccess: () => Navigator.push('dashboard')
})(LoginForm)

export default Login
