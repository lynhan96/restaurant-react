import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { reduxForm, change } from 'redux-form'

import { hasListData } from 'components/wrappers/hasListData'
import ListQuestionForm from 'components/form/ListQuestion'
import { submitListQuestion, submitListQuestionSuccess } from 'lib/submits/listQuestion'

const onClickNext = (dispatch, index) => {
  dispatch(change('listQuestion', 'questionIndex', index + 1))
}

const onClickPrev = (dispatch, index) => {
  dispatch(change('listQuestion', 'questionIndex', index - 1))
}

const getQuestions = R.pipe(
  R.prop('questions'),
  R.values
)

const ListQuestion = (props) => {
  const { setID, sets, user, questionFormValues = {}, dispatch } = props
  const set = R.prop(setID, sets || {})
  if (set == null) return null
  const { title } = set
  const questions = getQuestions(set || {})
  const totalQuestion = questions.length - 1

  const { questionIndex = 0 } = questionFormValues
  const index = questionIndex || 0
  const question = questions[index]
  const hasAnswered = R.has(question.id, questionFormValues)

  return (
    <div className='row'>
      <div className='col-md-12'>
        <h1>{title}</h1>
      </div>
      <div className='col-md-12'>
        <DecoratedListQuestionForm
          user={user}
          set={set}
          question={question}
          hasAnswered={hasAnswered}
          totalQuestion={totalQuestion}
          questionIndex={index}
          onClickNext={() => onClickNext(dispatch, index)}
          onClickPrev={() => onClickPrev(dispatch, index)}
        />
      </div>
    </div>
  )
}

const DecoratedListQuestionForm = reduxForm({
  form: 'listQuestion',
  onSubmit: submitListQuestion,
  onSubmitSuccess: submitListQuestionSuccess
})(ListQuestionForm)

const mapStateToProps = (state) => ({
  user: R.path(['user', 'data'], state),
  sets: R.path(['list', 'data', 'setData'], state),
  setID: R.path(['form', 'listSet', 'values', 'set'], state),
  questionFormValues: R.path(['form', 'listQuestion', 'values'], state)
})

export default connect(mapStateToProps)(hasListData(ListQuestion))
