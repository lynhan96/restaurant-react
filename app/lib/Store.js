import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { markHydrationCompleted } from 'ducks/hydration'
import reducers from 'ducks/index'
import { reducer as formReducer } from 'redux-form'
import { autoRehydrate, persistStore } from 'redux-persist'
import Reactotron from 'reactotron-react-js'
import { reactotronRedux } from 'reactotron-redux'

import { database, firebaseAuth } from 'database/database'
import { fetchPages } from 'ducks/pages'
import { adminHasSignedIn, adminHasSignedOut } from 'ducks/admin'
import { userHasSignedIn, userHasSignedOut } from 'ducks/user'

const middleware = [ thunk ]
var applyMiddlewareConfig

if (__DEV__) {
  Reactotron.configure({ name: 'SCA' })
    .use(reactotronRedux())
    .connect()

  // Clear Reactotron of previous loggings
  Reactotron.clear()

  applyMiddlewareConfig = compose(
    applyMiddleware(...middleware),
    autoRehydrate()
  )
} else {
  applyMiddlewareConfig = compose(
    applyMiddleware(...middleware),
    autoRehydrate()
  )
}

const initialState = {}
const rootReducers = combineReducers({...reducers, form: formReducer})
const create = __DEV__ ? Reactotron.createStore : createStore
const Store = create(rootReducers, initialState, applyMiddlewareConfig)

// Initialise the state
const { dispatch } = Store

// initialise public state
dispatch(fetchPages())

// Sync with Firebase Sign-in
// which can be by user, by changes in Firebase console or by local caching
// adminHasSignedIn will initialise state for admin
firebaseAuth.onAuthStateChanged((user) => {
  if (user) {
    const { uid } = user
    database.ref(`admins/${uid}`).once('value')
      .then((snapshot) => {
        const isAdmin = snapshot.val()
        if (isAdmin) dispatch(adminHasSignedIn(user))
      }).catch(() => {
        // This is a user
        dispatch(userHasSignedIn(user))
      })
  } else {
    // indiscriminately log out everyone
    dispatch(adminHasSignedOut())
    dispatch(userHasSignedOut())
  }
})

// Persist redux store in local storage
persistStore(
  Store,
  { blacklist: ['hydration'] },
  () => dispatch(markHydrationCompleted())
)

export default Store
