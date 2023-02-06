import { useState } from 'react'

const Blog = ({ user, blog, updateLikes, remove }) => {
  const [display, setDisplay] = useState('none')
  const [buttonLabel, setButtonLabel] = useState('show')
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const displayStyle = {
    display: display,
  }

  const handleDisplay = () => {
    if (display === 'none') {
      setDisplay('')
      setButtonLabel('hide')
    }
    if (display === '') {
      setDisplay('none')
      setButtonLabel('show')
    }
  }

  const handleLikes = () => {
    const blogObject = { ...blog, likes: likes + 1 }
    updateLikes(blog.id, blogObject)
    setLikes(likes + 1)
  }

  // const handleLikes = () => {
  //   updateLikes({
  //     id: blog.id
  //   })
  //   setLikes(likes + 1)
  // }

  // const handleDelete = () => {
  //   if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`))
  //     remove(blog.id)
  // }
  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}
      <button onClick={handleDisplay}>
        {buttonLabel}
      </button>
      <div style={displayStyle} className='blog-info'>
        <p>url: {blog.url}</p>
        <p>
          likes: {likes}
          <button id='like' onClick={() => {
            updateLikes(blog)
            // setLikes( likes + 1)
          }}>
          {/* <button id='like' onClick={handleLikes}> */}
            like
          </button>
        </p>
        {blog.user && <p>{blog.user.name}</p>}
        {blog.user && user.username === blog.user.username && (
          <button id='delete' onClick={() => remove(blog)}>
            remove
          </button>
        )}
      </div>
    </div>
  )
}

export default Blog