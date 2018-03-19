import { database } from 'database/database'

export const fetchNotifications = () => (dispatch) => {
  const ref = database.ref(`/notifications`)
  ref.once('value')
    .then((snapshot) => {
      const notificaiton = snapshot.val()
      console.log(notificaiton)
    })
    .then(() => {
      // attach listeners to data changes
      console.log('213123')
      ref.on('child_changed', (result) =>  console.log(result.val()))
    })
    .catch((error) => console.log(error))
}
