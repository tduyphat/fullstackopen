import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
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
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm