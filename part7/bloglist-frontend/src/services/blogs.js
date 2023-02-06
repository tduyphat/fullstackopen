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

const getSingle = async object => {
  const response = await axios.get(`${baseUrl}/${object.id}`)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const like = async object => {
  const updated = { ...object, likes: object.likes+1 }
  const response = await axios.put(`${baseUrl}/${object.id}`, updated)
  return response.data
}

const update = async (newObject) => {
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject, {
    headers: { Authorization: token },
  })
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: token },
  })
  return response.data
}

export default { getAll, getSingle, create, setToken, remove, like, update }