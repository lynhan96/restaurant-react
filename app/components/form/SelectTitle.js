import React from 'react'

import Select from 'components/form/Select'

const options = [
  { label: '-- select --', value: '' },
  { label: 'Dr', value: 'Dr' },
  { label: 'Prof', value: 'Prof' },
  { label: 'Mr', value: 'Mr' },
  { label: 'Ms', value: 'Ms' },
  { label: 'Mdm', value: 'Mdm' }
]

const SelectTitle = (props) => {
  return <Select {...props} options={options} />
}

export default SelectTitle
