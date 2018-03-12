import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { hasListData } from 'components/wrappers/hasListData'
import ListSetForm from 'components/form/ListSet'
import { submitListSet, submitListSetSuccess } from 'lib/submits/listSet'

const filterSetsByCategory = (category, sets) => R.pipe(
  R.values,
  R.filter(R.propEq('category', category))
)(sets)

const getAllSets = (sets) => R.pipe(
  R.values
)(sets)

const ListSet = (props) => {
  const { sets, category } = props
  const filteredSets = category === 'All sets' ? getAllSets(sets) : filterSetsByCategory(category, sets)

  return (
    <div className='row'>
      <div className='col-md-12'>
        <h1>{category}</h1>
      </div>
      <div className='col-md-12'>
        <DecoratedListSetForm sets={filteredSets} />
      </div>
    </div>
  )
}

const DecoratedListSetForm = reduxForm({
  form: 'listSet',
  destroyOnUnmount: false,
  onSubmit: submitListSet,
  onSubmitSuccess: submitListSetSuccess
})(ListSetForm)

const mapStateToProps = (state) => ({
  sets: R.path(['list', 'data', 'setData'], state),
  category: R.path(['form', 'listCategory', 'values', 'category'], state)
})

export default connect(mapStateToProps)(hasListData(ListSet))
