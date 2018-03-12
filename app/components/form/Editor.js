import React from 'react'
import RichTextEditor from 'react-rte'
import { ControlLabel, HelpBlock } from 'react-bootstrap/lib'

// TODO: Do we need image?
// React-rte RichTextEditor uses a customized value
// which is an object with functions attached
// so we need to handle the value object before passing to redux-form
class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: undefined }
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount() {
    const { input } = this.props
    const { value } = input

    // Manage our own state for value
    // instead of sending Editor's value to ReduxForm
    // else editor will be laggy
    this.setState({
      value: value ?
        RichTextEditor.createValueFromString(value, 'html') :
          RichTextEditor.createEmptyValue()
    })
  }

  handleChange(value) {
    const { input } = this.props
    const { onChange } = input
    const html = value.toString('html')
    this.setState({ value })
    // Call ReduxForm onChange with only the HTML string
    onChange(html)
  }

  render() {
    const { meta, label } = this.props
    const { value } = this.state
    const { touched, error } = meta

    return (
      <div>
        <ControlLabel>{label}</ControlLabel>
        {touched && error && <HelpBlock>{error}</HelpBlock>}
        <RichTextEditor
          value={value}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default Editor
