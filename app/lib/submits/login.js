import { SubmissionError } from 'redux-form'

import { database, firebaseAuth } from 'database/database'
import { adminHasSignedIn } from 'ducks/admin'

// Redux-form requires a promise for async submission
// so we return a promise
export const submitLogin =
  (values, dispatch, props) => {
    const { email, password } = values
    let admin = null

    // firebaseAuth#signInWithEmailAndPassword returns a promise
    return firebaseAuth.signInWithEmailAndPassword(email, password)
      .then((firebaseUser) => {
        admin = firebaseUser
        return Promise.resolve(admin)
      })
      .then((user) => database.ref(`admins/${user.uid}`).once('value'))
      .then((snapshot) => {
        const isAdmin = snapshot.val()
        if (!isAdmin) throw new Error('User is not an admin.')
        return Promise.resolve()
      })
      .then(() => dispatch(adminHasSignedIn(admin)))
      .catch((error) => {
        // { _error: 'ERROR' } will be passed to form
        // { email: 'ERROR' } will be passed to email field
        const { code, message } = error
        const userIsNotAdmin = code === 'PERMISSION_DENIED'
        const errorMessage = userIsNotAdmin ? 'User not found' : message
        throw new SubmissionError({ _error: errorMessage })
      })
  }
