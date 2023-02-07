import { Link } from 'react-router-dom'

const Navbar = ({ user, logOut }) => {

  const padding = {
    padding: 5,
  }

  return (
    <div style={{ backgroundColor: '#bebebe' }}>
      <Link to='/' style={padding}>
        blogs
      </Link>
      <Link to='users' style={padding}>
        users
      </Link>
      {user.name} logged in
      <button
        id='logout'
        onClick={logOut}
      >
        log out
      </button>
    </div>
  )
}

export default Navbar
