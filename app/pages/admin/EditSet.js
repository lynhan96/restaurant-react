import React from 'react'
import R from 'ramda'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import Navigator from 'lib/Navigator'

import SetForm from 'components/form/Set'
import { submitSet } from 'lib/submits/set'

const getInitialValues = (sets, setID) => {
  const defaultValues = {
    id: setID,
    title: '',
    category: 'General',
    overview: '',
    published: 'true',
    ordering: '1'
  }

  return R.pick([
    'id', 'title', 'category', 'overview', 'published', 'ordering'
  ])(sets[setID] || defaultValues)
}

const EditSet = (props) => {
  const { params = {}, sets } = props
  const { setID } = params
  if (sets == null || setID == null) return null
  const initialValues = getInitialValues(sets, setID)

  const DecoratedSetForm = reduxForm({
    form: `set-${setID}`,
    initialValues,
    onSubmit: submitSet,
    onSubmitSuccess: () => Navigator.push('admin/sets')
  })(SetForm)

  return (
    <div className='row'>
      <div className='col-md-12'>
        <h1>Set Form</h1>
      </div>
      <div className='col-md-12'>
        <DecoratedSetForm setID={setID} />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({ sets: R.path(['sets', 'data'], state) })

export default connect(mapStateToProps)(EditSet)
