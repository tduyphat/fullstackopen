const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
    transform: (blog, returnedBlog) => {
      returnedBlog.id = returnedBlog._id.toString()
      delete returnedBlog._id
      delete returnedBlog.__v
    }
  })

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = `mongodb+srv://tduyphat:Duyphat080300@cluster0.bhss4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

console.log('connecting to', mongoUrl)

mongoose.connect(mongoUrl)
.then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
    const body = request.body
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

  blog
    .save()
    .then(savedBlog => {
        response.json(savedBlog)
      })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})