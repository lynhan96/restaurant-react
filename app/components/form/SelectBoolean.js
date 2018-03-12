import React from 'react'

import Select from 'components/form/Select'

const options = [
  { label: '-- select --', value: '' },
  { label: 'yes', value: 'true' },
  { label: 'no', value: 'false' }
]

const SelectBoolean = (props) => {
  return <Select {...props} options={options} />
}

export default SelectBoolean
