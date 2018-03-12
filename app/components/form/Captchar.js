import React from 'react'
import { FormGroup, FormControl, HelpBlock } from 'react-bootstrap/lib'
import ReCAPTCHA from 'react-google-recaptcha'

const Captchar = (props) => {
  const { input, meta } = props
  const { onChange } = input
  const { touched, error } = meta
  const validationState = !touched ? null : error ? 'error' : 'success'

  return (
    <FormGroup validationState={validationState}>
      <ReCAPTCHA
        sitekey={GOOGLE_CAPTCHAR_KEY}
        onChange={onChange}
      />
      {touched && error && <HelpBlock>{error}</HelpBlock>}
      <FormControl.Feedback />
    </FormGroup>
  )
}

export default Captchar
