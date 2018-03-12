import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { hasListData } from 'components/wrappers/hasListData'
import ListCategoryForm from 'components/form/ListCategory'
import { submitListCategory, submitListCategorySuccess } from 'lib/submits/listCategory'

// Used to display all sets
const fakeSet = {
  fakeSet: {
    category: 'All sets',
    title: 'All sets'
  }
}

const pluckCategoriesFromSets = R.pipe(
  R.merge(fakeSet),
  R.values,
  R.pluck('category'),
  R.uniq
)

const ListCategory = (props) => {
  const { sets } = props
  const categories = pluckCategoriesFromSets(sets)

  return (
    <div className='row'>
      <div className='col-md-12'>
        <h1>Categories</h1>
      </div>
      <div className='col-md-12'>
        <DecoratedListCategoryForm categories={categories} />
      </div>
    </div>
  )
}

const DecoratedListCategoryForm = reduxForm({
  form: 'listCategory',
  destroyOnUnmount: false,
  onSubmit: submitListCategory,
  onSubmitSuccess: submitListCategorySuccess
})(ListCategoryForm)

const mapStateToProps = (state) => ({ sets: R.path(['list', 'data', 'setData'], state) })

export default R.compose(
  hasListData,
  connect(mapStateToProps)
)(ListCategory)
