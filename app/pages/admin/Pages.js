import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import Spinner from 'react-spinkit'
import Navigator from 'lib/Navigator'

import { isAdmin } from 'components/wrappers/isAdmin'
import PagesList from 'components/admin/PagesList'
import ErrorMessage from 'components/ErrorMessage'

const goToEdit = (pageID) => () =>
  Navigator.push(`admin/pages/form/${pageID}`)

const Pages = (props) => {
  const { loading, error, data } = props

  return (
    <div className='row'>
      <div className='col-md-12'>
        <h1>Pages</h1>
        {error && <ErrorMessage text={error} />}
        {loading && <Spinner spinnerName='double-bounce' noFadeIn /> }
        {!loading && <PagesList pages={data} goToEdit={goToEdit} />}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => state.pages

export default R.pipe(
  connect(mapStateToProps),
  isAdmin
)(Pages)
