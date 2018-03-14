import moment from 'moment'
import md5 from 'md5'

export const makeHeader = _ => {
  let headers = {
    'Content-Type': 'application/json',
    'Date-Time': moment.utc().format('YYYY-MM-DD hh:mm:ss'),
    'X-API-Language': 'en',
    'Uid': '',
    'Token': ''
  }

  headers['Authorization'] = md5(md5(headers['Token'] + headers['Uid'] + headers['Date']))
  return headers
}
