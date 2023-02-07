import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const getSingle = async object => {
  const response = await axios.get(`${baseUrl}/${object.id}`, {
    headers: { Authorization: token },
  })
  return response.data
}

const likeBlog = async object => {
  const updated = { ...object, likes: object.likes+1 }
  const response = await axios.put(`${baseUrl}/${object.id}`, updated, {
    headers: { Authorization: token },
  })
  return response.data
}

const remove = async object => {
  try {
    const config = {
      headers: { Authorization: token }
    }
    await axios.delete(`${baseUrl}/${object.id}`, config)
  } catch (e) {
    console.trace(e)
  }
}

export default { getAll, create, setToken, remove, likeBlog, getSingle }