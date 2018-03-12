import React from 'react'
import R from 'ramda'
import { Field } from 'redux-form'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'

import ErrorMessage from 'components/ErrorMessage'
import RadioOptions from 'components/form/RadioOptions'
import SubmitButton from 'components/form/SubmitButton'
import BackButton from 'components/form/BackButton'
import { isRequired } from 'lib/validators'

const setsToOptions = R.map((set) => ({
  optionTitle: set.title,
  optionDescription: set.overview,
  optionValue: set.id
}))

const ListSet = (props) => {
  const { error, submitting, handleSubmit, sets } = props
  const setsOptions = setsToOptions(sets)

  return (
    <form onSubmit={handleSubmit}>
      {error && <ErrorMessage text={error} />}
      {sets.length <= 0 && <ErrorMessage text='There is no data!' />}

      <Field
        name='set'
        component={RadioOptions}
        validate={isRequired}
        options={setsOptions}
        label='Please select your set:'
      />

      <ButtonToolbar>
        <BackButton />
        <SubmitButton
          text='Next'
          submitting={submitting}
        />
      </ButtonToolbar>
    </form>
  )
}

export default ListSet
