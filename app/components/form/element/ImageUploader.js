import React, { Component } from 'react'
import UploadPreview from 'material-ui-upload/UploadPreview'
import * as firebase from 'firebase'
import R from 'ramda'

class InputImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pictures: {test: 'https://firebasestorage.googleapis.com/v0/b/restaurant-8fb75.appspot.com/o/61629d4f9d4c4922dcbba187bf9ebc0c0a057ccf?alt=media&token=f92310da-5651-4b68-a43b-9241cb5491ee'}
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange(pictures) {
    var key = Object.keys(pictures)[0]

    var storageRef = firebase.storage().ref(key + '.png')
    
    console.log(pictures[key])
    var base64result = R.split(',', pictures[key])
    storageRef.putString(base64result[1], 'base64').then(function(snapshot) {
      console.log(snapshot.downloadURL)
    })

    this.props.input.onChange(pictures)
  }

  render() {
    const { label, name } = this.props

    return (
      <UploadPreview
        name={name}
        title={label}
        label='Thêm hình'
        initialItems={this.state.pictures}
        onChange={this.onChange}
        />
    )
  }
}

export default InputImage
