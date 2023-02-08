import { Navbar, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Navigator = ({ user, logOut }) => {

  const padding = {
    padding: 5,
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#" as="span">
            <Link to="/" style={padding}>
              blogs
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/users" style={padding}>
              users
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <em style={padding}>{user.name} logged in</em>
            <Button id="logout" onClick={logOut}>
              log out
            </Button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigator
