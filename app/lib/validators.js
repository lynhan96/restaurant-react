import R from 'ramda'
import { isEmail as isValidEmail, isNumeric } from 'validator'

// Applies a validatorFunction to a value
// and return undefined if true
// and an error message if false
export const validateWithErrorMessage = R.curry((validatorFunction, errorMessage, value) => {
  const result = validatorFunction(value)
  return result ? undefined : errorMessage
})

export const isRequired = (value) => value ? undefined : 'This field is required.'

export const isEmail = (value) => isValidEmail(value) ? undefined : 'Please enter a valid email.'

export const isNumber = (value) => isNumeric(String(value)) ? undefined : 'Please enter a number.'

export const isMoreThanNumber = number => value => parseInt(value) >= number ? undefined : 'Please enter the number bigger than ' + number + '.'

export const requiredYearsXP = (value) => parseInt(value) >= 10 ? undefined : 'The minimum years of experience required is 10. Please come back again if you do not meet the minimum requirement.'
