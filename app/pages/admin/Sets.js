import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import Spinner from 'react-spinkit'
import Button from 'react-bootstrap/lib/Button'
import Navigator from 'lib/Navigator'

import { isAdmin } from 'components/wrappers/isAdmin'
import SetsList from 'components/admin/SetsList'
import ErrorMessage from 'components/ErrorMessage'
import { getDatabaseID, removeInDB } from 'lib/database'

const goToEditSet = (setID) => () =>
  Navigator.push(`admin/sets/form/${setID}`)

const goToQuestions = (setID) => () =>
  Navigator.push(`admin/questions/${setID}`)

const deleteSet = (setID) => {
  removeInDB(`/sets`)(setID)
  removeInDB(`/questions`)(setID)
}

const Sets = (props) => {
  const { error, data } = props
  // data can be rehyrated or loaded
  const sets = data || {}
  const hasSetsData = !R.isEmpty(sets)

  return (
    <div className='row'>
      <div className='col-md-12'>
        <h1 style={styles.header}>
          Sets
          <Button bsStyle='info' onClick={goToEditSet(getDatabaseID())}>Add New Set</Button>
        </h1>
      </div>

      <div className='col-md-12'>
        {error && <ErrorMessage text={error} />}
      </div>

      <div className='col-md-12'>
        {hasSetsData &&
          <SetsList
            sets={sets}
            goToEditSet={goToEditSet}
            goToQuestions={goToQuestions}
            deleteSet={deleteSet}
          />}
        {!hasSetsData && <Spinner spinnerName='double-bounce' noFadeIn /> }
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

const mapStateToProps = (state) => state.sets

export default R.pipe(
  connect(mapStateToProps),
  isAdmin
)(Sets)
