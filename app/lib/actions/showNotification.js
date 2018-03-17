import { toast } from 'react-toastify'
import { css } from 'glamor'
import R from 'ramda'

const notificationPosition = position => {
  switch (position) {
    case 'topCenter':
      return 'TOP_CENTER'
    case 'topLeft':
      return 'TOP_LEFT'
    case 'bottomLeft':
      return 'BOTTOM_LEFT'
    case 'bottomCenter':
      return 'BOTTOM_CENTER'
    case 'bottomRight':
      return 'BOTTOM_RIGHT'
    default:
      return 'TOP_RIGHT'
  }
}

export const showNotification = (position, type, message) => {
  let customOption = {}
  let toastOptions = {
    position: toast.POSITION[notificationPosition(position)],
    autoClose: 4000
  }

  if (type === 'success') {
    customOption = {
      className: css({
        background: '#4caf50'
      })
    }
  }

  switch (type) {
    case 'success':
      return (
        toast.success(message, R.merge(customOption)(toastOptions))
      )
    case 'error':
      return (
        toast.error(message, toastOptions)
      )

    case 'warning':
      return (
        toast.warn(message, toastOptions)
      )
    case 'info':
      return (
        toast.info(message, toastOptions)
      )
    default:
      return (
        toast(message, toastOptions)
      )
  }
}
