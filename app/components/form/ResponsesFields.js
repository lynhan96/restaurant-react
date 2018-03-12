import React from 'react'
import { Field } from 'redux-form'

import InputText from 'components/form/InputText'
import InputTextArea from 'components/form/InputTextArea'
import { isRequired } from 'lib/validators'

const ResponsesFields = (props) => {
  const { fields } = props

  return (
    <div>
      <h3>Responses</h3>
      {fields.map((response, index) => {
        return (
          <div key={index}>
            <div className='row'>
              <div className='col-md-9'>
                <Field
                  name={`${response}.title`}
                  component={InputTextArea}
                  validate={[ isRequired ]}
                  label='Text:'
                />
              </div>
              <div className='col-md-3'>
                <Field
                  name={`${response}.weightage`}
                  component={InputText}
                  validate={[ isRequired ]}
                  label='Weightage (%):'
                />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ResponsesFields
