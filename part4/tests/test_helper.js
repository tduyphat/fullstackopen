const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'F Araska',
        author:'johnny',
        url:'www.farasaka.com',
        likes: 77,
      },
      // {
      //   title: 'F oraska',
      //   author:'joe',
      //   url:'www.forasaka.com',
      //   likes: 76,
      // },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'abc', author:'john doe', url:'www.farasaka.com', likes:66 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}


module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
}