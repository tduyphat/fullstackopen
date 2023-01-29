import { useState } from 'react'

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
      <form id='create-blog' onSubmit={handleCreateBlog}>
        <div>
        title
          <input
            id='title'
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
        author
          <input
            id='author'
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
        url
          <input
            id='url'
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm