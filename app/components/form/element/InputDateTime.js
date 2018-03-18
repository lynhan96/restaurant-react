import React from 'react'
import moment from 'moment'
import DatePicker from 'material-ui/DatePicker'
// We receive props from ReduxForm's Field
// and turn them into props for Bootstrap forms
const InputDateTime = (props) => {
  const { defaultValue, input, label } = props
  const { value, onChange } = input
  return (
    <div className='form-group label-floating' style={{ marginTop: '0' }}>
      {label && <label>{label}</label>}
      <DatePicker
        className='form-control'
        name={name}
        onChange={onChange}
        onClick={onChange}
        textFieldStyle={style.dateTimeInput}
        formatDate={(date) => moment.utc(date).add(7, 'hours').format('YYYY-MM-DD')}
      />
    </div>
  )
}

export default InputDateTime

const style = {
  dateTimeInput: {
    width: '100%',
    height: '36px',
    fontSize: '14px',
    paddingBottom: '14px'
  }
}
