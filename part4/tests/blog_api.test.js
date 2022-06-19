const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

// const initialBlogs = [
//   {
//     title: 'F Araska',
//     author:'johnny',
//     url:'www.farasaka.com',
//     likes:77
//   },
//   {
//     title: 'F oraska',
//     author:'joe',
//     url:'www.forasaka.com',
//     likes:76
//   }
// ]

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})
afterAll(() => {
  mongoose.connection.close()
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})
  
test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
  
    const title = response.body.map(r => r.title)
    expect(title).toContain(
      'F Araska'
    )
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'F Oraska',
    author:'adam',
    url:'www.forasaka.com',
    likes:77
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map((r) => r.title)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(titles).toContain(newBlog.title)
})

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

  expect(resultBlog.body).toEqual(processedBlogToView)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).not.toContain(blogToDelete.title)
})

test('verify id property is unique and defined', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const ids = response.body.map((r) => r.id)
  const confirmIfArrayUnique = (array) =>
    Array.isArray(array) && new Set(array).size === array.length

  response.body.forEach((blog) => {
    expect(blog.id).toBeDefined()
  })
  expect(confirmIfArrayUnique(ids)).toBeTruthy()
})

//checkpoint

test('if the likes property is missing from the request, it will default to the value 0', async () => {
  const newBlog = {
    title: 'hehe',
    author: 'hoho',
    url: 'www.nahnah.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api
    .get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(response.body[helper.initialBlogs.length].likes).toBe(0)
})