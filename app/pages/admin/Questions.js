import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import Spinner from 'react-spinkit'
import Button from 'react-bootstrap/lib/Button'
import Navigator from 'lib/Navigator'

import { isAdmin } from 'components/wrappers/isAdmin'
import QuestionsList from 'components/admin/QuestionsList'
import ErrorMessage from 'components/ErrorMessage'
import { getDatabaseID, removeInDB } from 'lib/database'

const goToEdit = (setID) => (questionID) => () =>
  Navigator.push(`admin/questions/${setID}/form/${questionID}`)

const deleteQuestion = (setID) => removeInDB(`/questions/${setID}`)

const Questions = (props) => {
  const { error, sets, questions, params } = props
  const { setID } = params || {}
  if (setID == null || sets == null || questions == null) return null
  // data can be rehyrated or loaded
  const set = R.prop(setID, sets) || {}
  const questionsFromSet = R.prop(setID, questions) || {}
  const { title } = set
  const hasQuestionsData = !R.isEmpty(questions)

  return (
    <div className='row'>
      <div className='col-md-12'>
        <h1>
          {title}
        </h1>
        <h2 style={styles.header}>
          Questions
          <Button bsStyle='info' onClick={goToEdit(setID)(getDatabaseID())}>Add New Question</Button>
        </h2>
      </div>

      <div className='col-md-12'>
        {error && <ErrorMessage text={error} />}
      </div>

      <div className='col-md-12'>
        {hasQuestionsData &&
          <QuestionsList
            questions={questionsFromSet}
            goToEdit={goToEdit(setID)}
            deleteQuestion={deleteQuestion(setID)}
          />}
        {!hasQuestionsData && <Spinner spinnerName='double-bounce' noFadeIn /> }
      </div>
    </div>
  )
}

const styles = {
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}

const mapStateToProps = (state) => ({
  sets: R.path(['sets', 'data'], state),
  questions: R.path(['questions', 'data'], state)
})

export default R.pipe(
  connect(mapStateToProps),
  isAdmin
)(Questions)
