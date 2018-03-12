import React from 'react'
import R from 'ramda'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import Navigator from 'lib/Navigator'

import PageForm from 'components/form/Page'
import { submitPage } from 'lib/submits/page'

const EditPage = (props) => {
  const { params = {}, pages } = props
  const { pageID } = params
  if (pageID == null || pages == null) return null
  const initialValues = pages[pageID]

  const DecoratedPageForm = reduxForm({
    form: `page-${pageID}`,
    initialValues,
    destroyOnUnmount: false,
    onSubmit: submitPage(pageID),
    onSubmitSuccess: () => Navigator.push('admin/pages')
  })(PageForm)

  return (
    <div className='row'>
      <div className='col-md-12'>
        <h1>Edit Page</h1>
      </div>
      <div className='col-md-12'>
        <DecoratedPageForm />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({ pages: R.path(['pages', 'data'], state) })

export default connect(mapStateToProps)(EditPage)
