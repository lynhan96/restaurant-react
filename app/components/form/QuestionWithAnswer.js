import React from 'react'
import R from 'ramda'
import { Field } from 'redux-form'
import Panel from 'react-bootstrap/lib/Panel'

import RadioOptions from 'components/form/RadioOptions'
import { isRequired } from 'lib/validators'

const responsesToOptions = R.map((response) => ({
  optionTitle: response.title,
  optionValue: response.id
}))

const QuestionWithAnswer = (props) => {
  const { question, index } = props
  const questionNumber = index + 1
  const { id, title, definition, responses } = question
  const responsesOptions = responsesToOptions(R.values(responses))

  return (
    <div>
      <Panel header={ questionNumber + '. ' + title} bsStyle='primary'>
        {definition}
      </Panel>
      <Field
        name={id}
        component={RadioOptions}
        validate={isRequired}
        options={responsesOptions}
        label='Please select your answer:'
      />
      <br/>
      <br/>
    </div>
  )
}

export default QuestionWithAnswer
