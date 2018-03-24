import React, { Component } from 'react'
import UploadPreview from 'material-ui-upload/UploadPreview'

class InputImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pictures: {}
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange(pictures) {
    this.setState({pictures})
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
