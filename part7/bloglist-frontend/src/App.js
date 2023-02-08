import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Route, Switch, Link } from 'react-router-dom'

import { Container, Table } from 'react-bootstrap'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { SuccessNotification, ErrorNotification } from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import SingleBlog from './components/SingleBlog'
import Navigator from './components/Navigator'

import { successNotification } from './reducers/successReducer'
import { errorNotification } from './reducers/errorReducer'
import { initBlogs, likeBlog, createBlog, removeBlog, commentBlog } from './reducers/blogReducer'
import { initUser, logOut, setUser } from './reducers/userReducer'

import userService from './services/users'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then(response => {
      setUsers(response)
    })
  }, [])

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

  const handleLogin = (event) => {
    event.preventDefault()

    try {
      dispatch(setUser(username, password))
      setUsername('')
      setPassword('')
    }

    catch (exception) {
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
    dispatch(removeBlog(blogObject.id))
  }

  const handleComment = async (blogObject) => {
    dispatch(commentBlog(blogObject))
  }

  return (
    <Container>
      <ErrorNotification />
      <SuccessNotification />
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          username={username}
          password={password}
        />
      ) : (
        <>
          <Navigator user={user} logOut={handleLogout} />
          <h2>blog app</h2>
          <Switch>
            <Route path="/users/:id">
              <User users={users} />
            </Route>
            <Route path="/users">
              <Users users={users} />
            </Route>
            <Route path="/blogs/:id">
              <SingleBlog
                blogs={blogs}
                updateLikes={handleLikes}
                deleteBlog={handleDelete}
                user={user}
                commenting={handleComment}
              />
            </Route>
            <Route path="/">
              <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm createBlog={handleCreateBlog} />
              </Togglable>
              <Table striped>
                <tbody>
                  {blogs
                    .sort((a, b) => a.likes - b.likes)
                    .map((blog) => (
                      <tr key={blog.id}>
                        <td>
                          <Link to={`/blogs/${blog.id}`}>
                            {blog.title} by {blog.author}
                          </Link>
                        </td>
                        <td>{blog.user.name}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Route>
          </Switch>
        </>
      )}
    </Container>
  )
}

export default App