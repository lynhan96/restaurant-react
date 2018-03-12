import React from 'react'
import { reduxForm } from 'redux-form'

import ApplyForm from 'components/form/Apply'
import { submitApply, submitApplySuccess } from 'lib/submits/apply'

const Validation = (props) => {
  return (
    <div className='row'>
      <div className='col-md-12'>
        <h1>Profile</h1>
      </div>
      <div className='col-md-6'>
        <DecoratedApplyForm />
      </div>
      <div className='col-md-6'/>
    </div>
  )
}

const DecoratedApplyForm = reduxForm({
  form: 'apply',
  destroyOnUnmount: false,
  onSubmit: submitApply,
  onSubmitSuccess: submitApplySuccess
})(ApplyForm)

export default Validation
