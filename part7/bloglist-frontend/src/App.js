import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { SuccessNotification, ErrorNotification } from './components/Notification'
import Togglable from './components/Togglable'

import { successNotification } from './reducers/successReducer'
import { errorNotification } from './reducers/errorReducer'
import { initBlogs, likeBlog, createBlog, removeBlog } from './reducers/blogReducer'
import { initUser, logOut, setUser } from './reducers/userReducer'

import blogService from './services/blogs'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initUser())
  }, [dispatch])

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      dispatch(setUser(username, password))
      setUsername('')
      setPassword('')

    } catch (exception) {
      dispatch(errorNotification('wrong username or password', 5000))
    }
  }

  const handleLogout = () => {
    dispatch(logOut())
  }

  const handleCreateBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
    dispatch(successNotification(`a new blog ${blogObject.title} by ${blogObject.author} has been added`, 5000))
  }

  const handleLikes = (blogObject) => {
    dispatch(likeBlog(blogObject.id))
  }

  const handleDelete = async (blogObject) => {
    const id = blogObject.id
    const deletedBlog = await blogService.getSingle({ id })
    dispatch(removeBlog(id))
    dispatch(successNotification(`blog ${deletedBlog.title} by ${deletedBlog.author} has been deleted`, 5000))
  }

  return (
    <div>
      <ErrorNotification />
      <SuccessNotification />
      <h2>blogs</h2>
      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          username={username}
          password={password}
        /> :
        <div>
          <p>{user.name} logged-in
            <span>
              <button id='logout-button' onClick={handleLogout}>
                logout
              </button>
            </span>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={handleCreateBlog} />
          </Togglable>
          <div className='blogs'>
            {blogs
              .sort((a, b) => a.likes - b.likes)
              .map((blog) =>
                <Blog
                  key={blog.id}
                  className='blog'
                  blog={blog}
                  user={user}
                  updateLikes={handleLikes}
                  remove={handleDelete}
                />
              )}
          </div>
        </div>
      }
    </div>
  )
}

export default App