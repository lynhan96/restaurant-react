import Navigator from 'lib/Navigator'

export const submitListCategory = (values, dispatch, props) => {
  // do nothing
  // because we just want the state in the form to continue
}

export const submitListCategorySuccess = (successResponse, dispatch) => {
  Navigator.push('list-set')
}
