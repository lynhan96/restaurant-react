import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
// We receive props from ReduxForm's Field
// and turn them into props for Bootstrap forms
class InputDateTime extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event, index, value) {
    this.props.input.onChange(value)
  }

  render() {
    const { defaultValue, label } = this.props

    return (
      <div className='form-group label-floating' style={{ marginTop: '0' }}>
        {label && <label>{label}</label>}
        <SelectField
          style={style.selectInput}
          value={defaultValue}
          onChange={this.handleChange}
        >
          <MenuItem value='Never' primaryText='Never' />
          <MenuItem value='Every Night' primaryText='Every Night' />
          <MenuItem value='Weeknights' primaryText='Weeknights' />
        </SelectField>
      </div>
    )
  }
}

export default InputDateTime

const style = {
  selectInput: {
    width: '100%',
    height: '43px',
    fontSize: '14px'
  }
}
