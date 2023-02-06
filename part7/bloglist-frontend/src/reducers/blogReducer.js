import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'LIKE':
    console.log('11111111111', action.data)
    return state.map((blog) => (blog.id === action.data.id ? action.data : blog))
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

export const likeBlog = (blog) => {
  return async dispatch => {
    const updatedblog = blogService.update({ ...blog, likes: blog.likes + 1 })
    dispatch({
      type: 'LIKE',
      blog: updatedblog,
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
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

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id)
    dispatch({
      type: 'DELETE',
      data: blog,
    })
  }
}

export default blogReducer