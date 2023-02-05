import React from 'react'
import { useSelector } from 'react-redux'

export const SuccessNotification = () => {
  const successMessage = useSelector(state => state.successMess)
  if (successMessage === null) {
    return null
  }

  return (
    <div className="success">
      {successMessage}
    </div>
  )
}

export const ErrorNotification = () => {
  const errorMessage = useSelector(state => state.errorMess)
  if (errorMessage === null) {
    return null
  }

  return (
    <div className="error">
      {errorMessage}
    </div>
  )
}