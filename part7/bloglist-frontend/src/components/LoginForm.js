import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
  handleRegister,
  newUsername,
  handleNewUsernameChange,
  newName,
  handleNewNameChange,
  newPassword,
  handleNewPasswordChange,
}) => {

  return (
    <div>
      <h2>log in to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>

          <Form.Control
            id="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />

          <Form.Label>password:</Form.Label>
          <Form.Control
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />

          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>

      <h2>register</h2>
      <Form onSubmit={handleRegister}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            id="newUsername"
            type="text"
            value={newUsername}
            onChange={handleNewUsernameChange}
          />

          <Form.Label>name:</Form.Label>
          <Form.Control
            id="name"
            type="text"
            value={newName}
            onChange={handleNewNameChange}
          />

          <Form.Label>password:</Form.Label>
          <Form.Control
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />

          <Button variant="primary" type="submit">
            register
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleRegister:PropTypes.func.isRequired,
  handleNewUsernameChange:PropTypes.func.isRequired,
  handleNewNameChange:PropTypes.func.isRequired,
  handleNewPasswordChange:PropTypes.func.isRequired,
  newUsername: PropTypes.string.isRequired,
  newName: PropTypes.string.isRequired,
  newPassword: PropTypes.string.isRequired,
}

export default LoginForm