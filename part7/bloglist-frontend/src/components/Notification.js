import React from 'react'
import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

export const SuccessNotification = () => {
  const successMessage = useSelector(state => state.successMess)
  if (successMessage === null) {
    return null
  }

  return (
    <div className="container">
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
    </div>
  )
}

export const ErrorNotification = () => {
  const errorMessage = useSelector(state => state.errorMess)
  if (errorMessage === null) {
    return null
  }

  return (
    <div className="container">
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
    </div>
  )
}