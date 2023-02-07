import { useParams } from 'react-router-dom'
import Blog from './Blog'

const SingleBlog = ({ blogs, updateLikes, remove, user }) => {
  const id = useParams().id
  const blog = blogs.find((b) => b.id === id)
  if (!blog) return null
  return (
    <Blog
      blog={blog}
      updateLikes={updateLikes}
      remove={remove}
      user={user}
    />
  )
}

export default SingleBlog