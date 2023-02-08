import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  return (
    <div>
      <Form onSubmit={handleCreateBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            id="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="A walk in the park"
          />

          <Form.Label>author:</Form.Label>
          <Form.Control
            id="author"
            value={author}
            onChange={handleAuthorChange}
            placeholder="John Doe"
          />

          <Form.Label>url:</Form.Label>
          <Form.Control
            id="url"
            value={url}
            onChange={handleUrlChange}
            placeholder="www.awalkinthepark.com"
          />

          <Button id="create-button" type="submit">
            create
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm