import React, { Component } from 'react'
import UploadPreview from 'material-ui-upload/UploadPreview'
import * as firebase from 'firebase'
import RaisedButton from 'material-ui/RaisedButton'
import R from 'ramda'

class ImageUploader extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(pictures) {
    this.props.input.onChange(pictures)
  }

  render() {
    const { label, name, defaultValue } = this.props
    const pictures = Object.assign({}, defaultValue)
    console.log(pictures)

    return (
      <div id='image'>
        <UploadPreview
          name={name}
          title={label}
          label=''
          buttonControl={RaisedButton}
          initialItems={pictures}
          onChange={this.onChange}
        />
      </div>
    )
  }
}

export default ImageUploader
