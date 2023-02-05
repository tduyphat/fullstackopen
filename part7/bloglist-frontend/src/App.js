import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import { SuccessNotification, ErrorNotification } from './components/Notification'
import { successNotification } from './reducers/successReducer'
import { errorNotification } from './reducers/errorReducer'

import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    if (user !== null)
      blogService
        .getAll()
        .then(initialBlogs => {
          setBlogs(initialBlogs)
        })
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      console.log(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      dispatch(errorNotification('wrong username or password', 5000))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const handleCreateBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        dispatch(successNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} has been added`, 5000))
      })
  }

  const handleLikes = async (id, blogObject) => {
    try {
      await blogService.update(id, blogObject)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
    } catch (error) {
      console.log(error)
    }
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