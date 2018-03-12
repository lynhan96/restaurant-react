import React from 'react'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import Button from 'react-bootstrap/lib/Button'
import { Field } from 'redux-form'

import ErrorMessage from 'components/ErrorMessage'
import QuestionWithAnswer from 'components/form/QuestionWithAnswer'
import SubmitButton from 'components/form/SubmitButton'
import BackButton from 'components/form/BackButton'

const ListQuestion = (props) => {
  const { error, submitting, handleSubmit, question, hasAnswered } = props
  const { totalQuestion, questionIndex, onClickNext, onClickPrev } = props

  if (question == null) return <ErrorMessage text='An error has occurred.' />

  return (
    <form onSubmit={handleSubmit}>
      {error && <ErrorMessage text={error} />}

      <QuestionWithAnswer question={question} index={questionIndex} />

      <ButtonToolbar>
        {questionIndex === 0 && <BackButton />}

        { questionIndex > 0 &&
          <Button
            className='btn btn-warning'
            onClick={onClickPrev}>
            Prev
          </Button>
        }

        { questionIndex < totalQuestion &&
          <Button
            disabled={!hasAnswered}
            className='btn btn-primary'
            onClick={onClickNext}>
            Next
          </Button>
        }

        { questionIndex >= totalQuestion &&
          <SubmitButton
            disabled={!hasAnswered}
            text='Submit'
            submitting={submitting}
          />
        }
      </ButtonToolbar>

      <Field
        name='questionIndex'
        component='input'
        type='hidden'
      />
    </form>
  )
}

export default ListQuestion
