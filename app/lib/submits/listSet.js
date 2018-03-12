import Navigator from 'lib/Navigator'

export const submitListSet = (values, dispatch, props) => {
  // do nothing
  // because we just want the state in the form for the next step
}

export const submitListSetSuccess = (successResponse, dispatch) => {
  Navigator.push('list-question')
}
