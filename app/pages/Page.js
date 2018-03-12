import React from 'react'
import { connect } from 'react-redux'
import Spinner from 'react-spinkit'

import ErrorMessage from 'components/ErrorMessage'

const Page = (props) => {
  const { loading, error, data = {}, params } = props
  const { page = 'home' } = params || {}
  const { title, content } = data[page] || {}

  if (loading) return <Spinner spinnerName='double-bounce' noFadeIn />
  if (error) return <ErrorMessage text={error} />

  return (
    <div className='row'>
      <div className='col-md-12'>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => state.pages

export default connect(mapStateToProps)(Page)
