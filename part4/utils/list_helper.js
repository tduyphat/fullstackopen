const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (total, blog) => total + blog.likes
    return blogs.reduce(reducer,0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return('blog list is empty')
    }
    const reducer = (favorite, blog) => 
    {
      if (favorite.likes >= blog.likes) {
        return favorite
      } 
      else {
          return blog
      }
    }
    return blogs.reduce(reducer, blogs[0])
}
  
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}