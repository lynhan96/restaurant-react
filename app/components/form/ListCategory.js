import React from 'react'
import R from 'ramda'
import { Field } from 'redux-form'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'

import ErrorMessage from 'components/ErrorMessage'
import RadioOptions from 'components/form/RadioOptions'
import SubmitButton from 'components/form/SubmitButton'
import BackButton from 'components/form/BackButton'
import { isRequired } from 'lib/validators'

const arrayToOptions = R.map((name) => ({
  optionTitle: name,
  optionValue: name
}))

const ListCategory = (props) => {
  const { error, submitting, handleSubmit, categories } = props
  const categoryOptions = arrayToOptions(categories)
  const hasCategories = categories.length > 0

  if (!hasCategories) return <div><ErrorMessage text='There is no data!' /></div>

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {error && <ErrorMessage text={error} />}

        <Field
          name='category'
          component={RadioOptions}
          validate={isRequired}
          options={categoryOptions}
          label='Please select your category:'
        />

        <ButtonToolbar>
          <BackButton />
          <SubmitButton
            text='Next'
            submitting={submitting}
          />
        </ButtonToolbar>
      </form>
    </div>
  )
}

export default ListCategory
