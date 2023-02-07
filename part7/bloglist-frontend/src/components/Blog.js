const Blog = ({ user, blog, updateLikes, remove }) => {

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
    </>
  )
}

export default Blog