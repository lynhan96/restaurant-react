import { SubmissionError } from 'redux-form'
import request from 'request-promise'

import { makeRequestOptions } from '../requestHeader'
import { adminHasSignedIn } from 'ducks/admin'
// Redux-form requires a promise for async submission
// so we return a promise
export const submitLogin =
  (values, dispatch, props) => {
    const { email, password } = values
    let admin = null

    const url = 'login'
    const params = { email: email, password: password }

    return request(makeRequestOptions(params, url)).then(body => {
      if (body.code === 0) {
        admin = body.data
        dispatch(adminHasSignedIn(admin))
        return Promise.resolve(admin)
      } else if (body.code === 416) {
        throw new SubmissionError({ _error: 'Mật khẩu không hợp lệ!' })
      } else if (body.code === 414) {
        throw new SubmissionError({ _error: 'Tài khoản không tồn tại!' })
      }
    })
    .catch(function (err) {
      if (err.errors && err.errors._error) {
        throw new SubmissionError({ _error: err.errors._error })
      } else {
        throw new SubmissionError({ _error: err.message })
      }
    })
  }
