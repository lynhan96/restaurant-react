import * as firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDsJk9yn5TKuXQWzEuud4alyXs8Dcp8PXI',
  authDomain: 'sca-fellowship.firebaseapp.com',
  databaseURL: 'https://sca-fellowship.firebaseio.com',
  projectId: 'sca-fellowship',
  storageBucket: 'sca-fellowship.appspot.com',
  messagingSenderId: '490797441505'
}

export const firebaseApp = firebase.initializeApp(config)

export const database = firebaseApp.database()

export const firebaseAuth = firebaseApp.auth()

export const timestamp = firebase.database.ServerValue.TIMESTAMP
