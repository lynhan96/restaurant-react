import R from 'ramda'
import { SubmissionError, change } from 'redux-form'
import Navigator from 'lib/Navigator'

import { database, firebaseAuth, timestamp } from 'database/database'

// TODO: Security issue to be fixed when all user have to create an account first
const tempPassword = 'pEw+Nam>je4{gbTR.Ev'

export const submitApply = (values, dispatch, props) => {
  const { email } = values

  return new Promise((resolve) => {
    firebaseAuth.signInWithEmailAndPassword(email, tempPassword)
      .then((firebaseUser) => {
        resolve(updateFirebaseUser(firebaseUser.uid, values))
      })
      .catch((error) => {
        const { code, message } = error
        if (code === 'auth/user-not-found') {
          resolve(createFirebaseUser(values))
        } else {
          throw new SubmissionError({ _error: message })
        }
      })
  })
}

const createParams = (values, extraParams) => {
  return R.pipe(
    R.pick(['name', 'email', 'company', 'position', 'title', 'country', 'yearXP']),
    R.merge(R.__, extraParams),
    R.evolve({ yearXP: parseInt })
  )(values)
}

const updateFirebaseUser = (uid, values) => {
  const params = createParams(values, { id: uid })
  const path = 'users/' + uid
  return setUserData(path, params)
}

const createFirebaseUser = (values) => {
  const { email } = values

  return firebaseAuth.createUserWithEmailAndPassword(email, tempPassword)
    .then((firebaseUser) => {
      const { uid } = firebaseUser
      const params = createParams(values, { id: uid, createdAt: timestamp })
      const path = 'users/' + uid
      return setUserData(path, params)
    })
    .catch((error) => {
      const { message } = error
      throw new SubmissionError({ _error: message })
    })
}

const setUserData = (path, params) => database.ref(path).set(params)

export const submitApplySuccess = (successResponse, dispatch) => {
  resetApplyCaptchar(dispatch)
  Navigator.push('list-category')
}

const resetApplyCaptchar = (dispatch) => dispatch(change('apply', 'captchar', null))
