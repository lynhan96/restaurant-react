import React from 'react'
import { reduxForm } from 'redux-form'
import Navigator from 'lib/Navigator'

import LoginForm from 'components/form/Login'
import { submitLogin } from 'lib/submits/login'
import { adminHasSignedOut } from 'ducks/admin'
import Store from 'lib/Store'

const Login = (props) => {
  const { dispatch } = Store
  dispatch(adminHasSignedOut())

  return (
    <div className='content'>
      <div className='col-md-4'/>
      <div className='col-md-4'>
        <div className='card' style={style.cardBackground}>
          <div className='card-header'>
            <h2 className='card-title' style={style.cardTitle}> Restaurant CMS</h2>
          </div>
          <div className='card-body'>
            <DecoratedLoginForm />
          </div>
        </div>
      </div>
      <div className='col-md-4'/>
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

const style = {
  cardBackground: {
    background: 'white',
    marginTop: '20vh'
  },
  cardTitle: {
    textAlign: 'center'
  }
}

export default Login
