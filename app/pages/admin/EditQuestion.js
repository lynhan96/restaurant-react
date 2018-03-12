import React from 'react'
import R from 'ramda'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import Navigator from 'lib/Navigator'

import QuestionForm from 'components/form/Question'
import { submitQuestion } from 'lib/submits/question'
import { getDatabaseID } from 'lib/database'

const getInitialValues = (questions, setID, questionID) => {
  const defaultOrderingValue = R.pipe(
    R.prop(setID),
    R.keys,
    R.length,
    R.inc,
    R.multiply(10)
  )(questions || {})

  const defaultValues = {
    id: questionID,
    title: '',
    definition: '',
    ordering: defaultOrderingValue,
    responses: [
      { id: getDatabaseID(), title: '', weightage: '25' },
      { id: getDatabaseID(), title: '', weightage: '50' },
      { id: getDatabaseID(), title: '', weightage: '75' },
      { id: getDatabaseID(), title: '', weightage: '100' }
    ]
  }

  // ReduxForm FieldArray requires an array of Objects for responses
  return R.pipe(
    R.path([setID, questionID]),
    R.evolve({ 'responses': R.values }),
    R.merge(defaultValues)
  )(questions || {})
}

const EditQuestion = (props) => {
  const { params = {}, sets, questions } = props
  const { setID, questionID } = params
  if (setID == null || questionID == null || sets == null || questions == null) return null
  const initialValues = getInitialValues(questions, setID, questionID)

  const DecoratedQuestionForm = reduxForm({
    form: `question-${questionID}`,
    initialValues,
    destroyOnUnmount: false,
    onSubmit: submitQuestion,
    onSubmitSuccess: () => Navigator.push(`admin/questions/${setID}`)
  })(QuestionForm)

  return (
    <div className='row'>
      <div className='col-md-12'>
        <h1>Question Form</h1>
      </div>
      <div className='col-md-12'>
        <DecoratedQuestionForm setID={setID} questionID={questionID} />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  sets: R.path(['sets', 'data'], state),
  questions: R.path(['questions', 'data'], state)
})

export default connect(mapStateToProps)(EditQuestion)
