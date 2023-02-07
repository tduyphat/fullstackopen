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
    return state.filter(blog => blog.id !== action.data)
  default:
    return state
  }
}

export const likeBlog = (id) => {
  return async dispatch => {
    const blogToLike = await blogService.getSingle({ id })
    const likedBlog = await blogService.likeBlog(blogToLike)
    dispatch({
      type: 'LIKE',
      data: likedBlog
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

export const removeBlog = (id) => {
  return async dispatch => {
    const toDelete = id
    await blogService.remove({ id })
    dispatch({
      type: 'DELETE',
      data: toDelete
    })
  }
}

export default blogReducer