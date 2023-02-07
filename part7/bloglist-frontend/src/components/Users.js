// import { useState, useEffect } from 'react'
// import userService from '../services/users'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {
//   const [users, setUsers] = useState([])
//   useEffect(() => {
//     userService.getAll().then((response) => {
//       setUsers(response)
//     })
//   })
  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>
              <b>blogs created</b>
            </td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Users
