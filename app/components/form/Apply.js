import React from 'react'
import { Field } from 'redux-form'

import ErrorMessage from 'components/ErrorMessage'
import InputText from 'components/form/InputText'
import SelectCountry from 'components/form/SelectCountry'
import SelectTitle from 'components/form/SelectTitle'
import Captchar from 'components/form/Captchar'
import SubmitButton from 'components/form/SubmitButton'
import { isRequired, isEmail, isNumber, requiredYearsXP } from 'lib/validators'

const ApplyForm = (props) => {
  const { error, submitting, handleSubmit } = props

  return (
    <form onSubmit={handleSubmit}>
      {error && <ErrorMessage text={error} />}

      <Field
        name='title'
        component={SelectTitle}
        validate={isRequired}
        label='Title:'
      />

      <Field
        name='name'
        component={InputText}
        validate={isRequired}
        label='Name:'
      />

      <Field
        name='email'
        component={InputText}
        validate={[ isRequired, isEmail ]}
        label='Email:'
      />

      <Field
        name='company'
        component={InputText}
        validate={isRequired}
        label='Company:'
      />

      <Field
        name='position'
        component={InputText}
        validate={[ isRequired ]}
        label='Position:'
      />

      <Field
        name='yearXP'
        component={InputText}
        validate={[ isRequired, isNumber, requiredYearsXP ]}
        label='Years of working experience in direct logistics and supply chain:'
      />

      <Field
        name='country'
        component={SelectCountry}
        validate={isRequired}
        label='Country:'
      />

      <Field
        name='captchar'
        validate={isRequired}
        component={Captchar}
        parse={null}
      />

      <SubmitButton
        text='Submit'
        submitting={submitting}
      />
    </form>
  )
}

export default ApplyForm
