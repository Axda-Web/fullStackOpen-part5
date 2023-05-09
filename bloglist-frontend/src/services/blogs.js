import axios from 'axios'
const baseUrl = '/api/blogs'

const setToken = newToken => {
  return `Bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (newBlog, token) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (id, updatedBlog, token) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config)

  return response.data
}

const remove = async (id, token) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)

  return response.data
}

export default { getAll, setToken, create, update, remove }