import * as firebase from 'firebase'
import R from 'ramda'

export const uploadImage = pictures => {
  const keys= Object.keys(pictures)
  const imageUrlList = []

  keys.map((key, index) => {
    console.log('1')
    const storageRef = firebase.storage().ref(key + '.png')

    const base64result = R.split(',', pictures[key])
    storageRef.putString(base64result[1], 'base64').then(function(snapshot) {
      console.log('2')
      imageUrlList.push(snapshot.downloadURL)
    })
  })
  console.log('done')
  return { imageUrl: imageUrlList }
}