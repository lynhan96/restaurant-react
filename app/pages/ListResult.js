import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import Spinner from 'react-spinkit'
import Navigator from 'lib/Navigator'

import ErrorMessage from 'components/ErrorMessage'
import Result from 'components/Result'
import { sendResultToAdminEmail, resetMailToAdminStatus } from 'ducks/results'

const goToThankYou = (dispatch, setID) => {
  dispatch(sendResultToAdminEmail(setID))
}

class ListResult extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { dispatch, mailToAdmin } = nextProps

    if (mailToAdmin === true) {
      Navigator.push('thank-you')
      dispatch(resetMailToAdminStatus())
    }
  }

  render() {
    const { params, loading, data: results, sets, error, dispatch } = this.props
    const { setID } = params || {}
    if (setID == null || results == null || sets == null) return null
    const set = sets[setID]
    const result = results[setID]
    if (set == null || result == null) return <ErrorMessage text='No result founds.' />

    return (
      <div>
        { error !== null && <ErrorMessage text={error} /> }
        { loading ?
          <Spinner spinnerName='double-bounce' noFadeIn /> :
          <Result set={set} result={result} goToThankYou={() => goToThankYou(dispatch, setID)} />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.results,
  sets: R.path(['list', 'data', 'setData'], state)
})

export default connect(mapStateToProps)(ListResult)
