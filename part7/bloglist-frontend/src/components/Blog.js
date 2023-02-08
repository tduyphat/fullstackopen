import { useState } from 'react'
import { useHistory } from 'react-router'
import { Button, Form } from 'react-bootstrap'

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
        <Button id="like" onClick={handleLikes}>
          like
        </Button>
      </p>
      {blog.user && <p>added by {blog.user.name}</p>}
      {blog.user && user.username === blog.user.username && (
        <Button id="delete" onClick={handleDelete}>
          remove
        </Button>
      )}
      <Form onSubmit={handleComment}>
        <Form.Group>
          <Form.Control
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <Button type="submit">add comment</Button>
        </Form.Group>
      </Form>
      <h3>comments</h3>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </>
  )
}

export default Blog