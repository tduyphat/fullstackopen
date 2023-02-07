import { Link, useParams } from 'react-router-dom'

const User = ({ users }) => {
  const id = useParams().id
  const user = users.find((user) => user.id === id)
  if (!user) return null
  return (
    <>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default User
