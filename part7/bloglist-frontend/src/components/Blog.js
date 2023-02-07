import { useState } from 'react'
import { useHistory } from 'react-router'

const Blog = ({ user, blog, updateLikes, remove, commenting }) => {

  const history = useHistory()
  const [comment, setComment] = useState('')

  const handleLikes = () => {
    updateLikes({
      id: blog.id
    })
  }

  const handleDelete = () => {
    if (window.confirm(`Delete ${blog.title} by ${blog.author} ?`))
      remove({
        id : blog.id,
        user: blog.user
      })
    history.push('/')
  }

  const handleComment =  (event) => {
    event.preventDefault()
    commenting({
      id: blog.id,
      comment,
      author: blog.author,
      likes: blog.likes
    })
    setComment('')
  }

  return (
    <>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <p>{blog.url}</p>
      <p>
        {blog.likes} likes
        <button id="like" onClick={handleLikes}>
          like
        </button>
      </p>
      {blog.user && <p>added by {blog.user.name}</p>}
      {blog.user && user.username === blog.user.username && (
        <button id="delete" onClick={handleDelete}>
          remove
        </button>
      )}
      <form onSubmit={handleComment}>
        <input type='text' value={comment} onChange={({ target }) => setComment(target.value)}/>
        <button type='submit'>add comment</button>
      </form>
      <h3>comments</h3>
      <ul>
        {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
      </ul>
    </>
  )
}

export default Blog