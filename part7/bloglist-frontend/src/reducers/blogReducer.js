import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'LIKE':
    return state.map(blog => blog.id !== action.data.id ? blog : action.data)
  case 'CREATE':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'DELETE':
    console.log(action)
    return state.filter(blog => blog.id !== action.data)
  default:
    return state
  }
}

export const likeBlog = (id) => {
  return async dispatch => {
    const needBlog= await blogService.getOne({ id })
    const updatedBlog = await blogService.likeBlog(needBlog)
    dispatch({
      type: 'LIKE',
      data: updatedBlog
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.upload(blog)
    dispatch({
      type: 'CREATE',
      data: newBlog
    })
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    const avoid = id
    await blogService.clearOut({ id })
    dispatch({
      type: 'DELETE',
      data: avoid
    })
  }
}

export default blogReducer